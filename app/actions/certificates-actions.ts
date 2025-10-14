"use server"

import { createClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { fileToBytes, bytesToBase64, detectFileType } from "@/lib/file-utils"

export async function verifyCertificate(certificateNumber: string) {
  try {
    const supabase = createClient()

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_number", certificateNumber)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, message: "الشهادة غير موجودة" }
      }
      throw error
    }

    console.log("📋 Certificate found:", {
      id: certificate.id,
      number: certificate.certificate_number,
      hasImage: !!certificate.certificate_image,
      imageType: typeof certificate.certificate_image,
      imageLength: certificate.certificate_image ? certificate.certificate_image.length : 0,
      imagePreview: certificate.certificate_image ? certificate.certificate_image.substring(0, 100) + '...' : 'null'
    })

    return {
      success: true,
      message: "تم العثور على الشهادة بنجاح",
      certificate,
    }
  } catch (error) {
    console.error("Error verifying certificate:", error)
    return { success: false, message: "حدث خطأ أثناء التحقق من الشهادة" }
  }
}

export async function addCertificate(formData: FormData) {
  try {
    const supabase = createClient()

    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const issueDate = formData.get("issueDate") as string

    let certificateImageData = null

    if (certificateImageFile && certificateImageFile.size > 0) {
      // Convert file to bytes
      const fileBytes = await fileToBytes(certificateImageFile)
      
      // Detect file type
      const detectedMimeType = detectFileType(fileBytes)
      
      // Store file data with metadata
      const fileData = {
        data: bytesToBase64(fileBytes),
        mimeType: detectedMimeType,
        originalName: certificateImageFile.name,
        size: certificateImageFile.size
      }
      
      certificateImageData = JSON.stringify(fileData)
    }

    const { error } = await supabase.from("certificates").insert({
      certificate_number: certificateNumber,
      certificate_image: certificateImageData,
      issue_date: issueDate || new Date().toISOString().split("T")[0],
    })

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم إضافة الشهادة بنجاح" }
  } catch (error) {
    console.error("Error adding certificate:", error)
    return { success: false, message: "حدث خطأ أثناء إضافة الشهادة" }
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const supabase = createClient()

    const certificateNumber = formData.get("certificateNumber") as string
    const certificateImageFile = formData.get("certificateImage") as File
    const issueDate = formData.get("issueDate") as string

    const updateData: any = {
      certificate_number: certificateNumber,
      issue_date: issueDate,
    }

    if (certificateImageFile && certificateImageFile.size > 0) {
      // Convert file to bytes
      const fileBytes = await fileToBytes(certificateImageFile)
      
      // Detect file type
      const detectedMimeType = detectFileType(fileBytes)
      
      // Store file data with metadata
      const fileData = {
        data: bytesToBase64(fileBytes),
        mimeType: detectedMimeType,
        originalName: certificateImageFile.name,
        size: certificateImageFile.size
      }
      
      updateData.certificate_image = JSON.stringify(fileData)
    }

    const { error } = await supabase.from("certificates").update(updateData).eq("id", id)

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "رقم الشهادة موجود مسبقاً" }
      }
      throw error
    }

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم تحديث الشهادة بنجاح" }
  } catch (error) {
    console.error("Error updating certificate:", error)
    return { success: false, message: "حدث خطأ أثناء تحديث الشهادة" }
  }
}

export async function deleteCertificate(id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("certificates").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/certificates")
    return { success: true, message: "تم حذف الشهادة بنجاح" }
  } catch (error) {
    console.error("Error deleting certificate:", error)
    return { success: false, message: "حدث خطأ أثناء حذف الشهادة" }
  }
}

export async function getCertificates() {
  try {
    const supabase = createClient()

    const { data: certificates, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return { success: true, certificates }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return { success: false, certificates: [] }
  }
}

export async function downloadCertificateFile(certificateId: string) {
  try {
    const supabase = createClient()

    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("certificate_image, certificate_number")
      .eq("id", certificateId)
      .single()

    if (error) {
      throw error
    }

    if (!certificate?.certificate_image) {
      return { success: false, message: "لا يوجد ملف مرفق بهذه الشهادة" }
    }

    // Decode hex-escaped data if needed
    let decodedData = certificate.certificate_image
    if (certificate.certificate_image.includes('\\x')) {
      console.log('🔧 Decoding hex-escaped data for download...')
      
      // Method 1: Replace hex escape sequences
      decodedData = certificate.certificate_image.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16))
      })
      
      // Method 2: If it starts with \x and rest is hex, decode as pure hex
      if (certificate.certificate_image.startsWith('\\x') && certificate.certificate_image.length > 3) {
        const hexPart = certificate.certificate_image.substring(3)
        if (hexPart.match(/^[0-9A-Fa-f]+$/)) {
          console.log('🔧 Decoding as pure hex data for download...')
          let result = ''
          for (let i = 0; i < hexPart.length; i += 2) {
            const hex = hexPart.substr(i, 2)
            result += String.fromCharCode(parseInt(hex, 16))
          }
          decodedData = result
        }
      }
    }
    
    // Try to parse as JSON first
    let fileData
    try {
      fileData = JSON.parse(decodedData)
    } catch (error) {
      console.log('❌ JSON parse failed for download, trying to extract JSON...')
      
      // Check if the decoded data looks like it contains JSON
      if (decodedData.includes('"data":') || decodedData.includes('"mimeType":')) {
        console.log('🔍 Server: Decoded data seems to contain JSON, trying to extract it...')
        
        // Try to find and extract JSON from the decoded data
        const jsonMatch = decodedData.match(/\{.*"data".*\}/)
        if (jsonMatch) {
          try {
            const extractedJson = jsonMatch[0]
            console.log('🔧 Server: Extracted JSON for download')
            
            fileData = JSON.parse(extractedJson)
            console.log('✅ Server: Extracted JSON parsed successfully for download')
          } catch (extractError) {
            console.log('❌ Server: Failed to parse extracted JSON:', extractError.message)
          }
        }
      }
      
      if (!fileData) {
        console.log('❌ Server: No JSON found, treating as binary image data')
        
        // If it's binary data, create a file data object
        if (certificate.certificate_image.includes('\\x')) {
          try {
            // Convert binary data to base64 using btoa
            const base64Data = btoa(decodedData)
            console.log('✅ Server: Base64 conversion successful for download')
            
            fileData = {
              data: base64Data,
              mimeType: 'image/jpeg',
              originalName: `certificate-${certificate.certificate_number}.jpg`,
              size: decodedData.length
            }
          } catch (error) {
            console.log('❌ Server: Base64 conversion failed, using manual method')
            
            // Fallback: manual conversion
            const bytes = new Uint8Array(decodedData.length)
            for (let i = 0; i < decodedData.length; i++) {
              bytes[i] = decodedData.charCodeAt(i)
            }
            
            let base64Data = ''
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
            for (let i = 0; i < bytes.length; i += 3) {
              const a = bytes[i]
              const b = bytes[i + 1] || 0
              const c = bytes[i + 2] || 0
              
              const bitmap = (a << 16) | (b << 8) | c
              
              base64Data += chars.charAt((bitmap >> 18) & 63)
              base64Data += chars.charAt((bitmap >> 12) & 63)
              base64Data += i + 1 < bytes.length ? chars.charAt((bitmap >> 6) & 63) : '='
              base64Data += i + 2 < bytes.length ? chars.charAt(bitmap & 63) : '='
            }
            
            fileData = {
              data: base64Data,
              mimeType: 'image/jpeg',
              originalName: `certificate-${certificate.certificate_number}.jpg`,
              size: bytes.length
            }
          }
        } else {
          return { success: false, message: "تنسيق الملف غير مدعوم" }
        }
      }
    }
    
    return {
      success: true,
      fileData: {
        data: fileData.data,
        mimeType: fileData.mimeType,
        originalName: fileData.originalName || `certificate-${certificate.certificate_number}`,
        size: fileData.size
      }
    }
  } catch (error) {
    console.error("Error downloading certificate file:", error)
    return { success: false, message: "حدث خطأ أثناء تحميل الملف" }
  }
}
