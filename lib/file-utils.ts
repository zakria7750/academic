/**
 * File utilities for detecting file types and handling file operations
 */

// File type signatures (magic bytes)
const FILE_SIGNATURES = {
  // Images
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF],
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  ],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  ],
  'image/webp': [
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
  ],
  'image/bmp': [
    [0x42, 0x4D],
  ],
  'image/tiff': [
    [0x49, 0x49, 0x2A, 0x00],
    [0x4D, 0x4D, 0x00, 0x2A],
  ],

  // Documents
  'application/pdf': [
    [0x25, 0x50, 0x44, 0x46], // %PDF
  ],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    [0x50, 0x4B, 0x03, 0x04], // DOCX (ZIP-based)
  ],
  'application/msword': [
    [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1], // DOC
  ],
  'application/rtf': [
    [0x7B, 0x5C, 0x72, 0x74, 0x66], // {\rtf
  ],
  'text/plain': [
    // Will be detected by elimination or specific patterns
  ],
}

/**
 * Detect file type from byte array
 */
export function detectFileType(bytes: Uint8Array): string {
  // Check each known signature
  for (const [mimeType, signatures] of Object.entries(FILE_SIGNATURES)) {
    for (const signature of signatures) {
      if (matchesSignature(bytes, signature)) {
        return mimeType
      }
    }
  }

  // Check if it's likely text
  if (isLikelyText(bytes)) {
    return 'text/plain'
  }

  // Default to binary
  return 'application/octet-stream'
}

/**
 * Check if bytes match a signature
 */
function matchesSignature(bytes: Uint8Array, signature: (number | null)[]): boolean {
  if (bytes.length < signature.length) {
    return false
  }

  for (let i = 0; i < signature.length; i++) {
    if (signature[i] !== null && bytes[i] !== signature[i]) {
      return false
    }
  }

  return true
}

/**
 * Check if bytes are likely text
 */
function isLikelyText(bytes: Uint8Array): boolean {
  if (bytes.length === 0) return false

  let textBytes = 0
  const sampleSize = Math.min(bytes.length, 1024) // Check first 1KB

  for (let i = 0; i < sampleSize; i++) {
    const byte = bytes[i]
    
    // Common text characters
    if (
      (byte >= 0x20 && byte <= 0x7E) || // Printable ASCII
      byte === 0x09 || // Tab
      byte === 0x0A || // LF
      byte === 0x0D || // CR
      (byte >= 0xC0 && byte <= 0xFD) // UTF-8 multi-byte start
    ) {
      textBytes++
    }
  }

  // If more than 95% are text characters, consider it text
  return (textBytes / sampleSize) > 0.95
}

/**
 * Check if file type is an image
 */
export function isImageType(mimeType: string): boolean {
  return mimeType.startsWith('image/')
}

/**
 * Get file extension from mime type
 */
export function getFileExtension(mimeType: string): string {
  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/msword': 'doc',
    'application/rtf': 'rtf',
    'text/plain': 'txt',
  }

  return extensions[mimeType] || 'bin'
}

/**
 * Convert File to Uint8Array
 */
export async function fileToBytes(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

/**
 * Convert Uint8Array to base64 string for database storage
 */
export function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/**
 * Convert base64 string to Uint8Array
 */
export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/**
 * Create data URL from bytes and mime type
 */
export function createDataUrl(bytes: Uint8Array, mimeType: string): string {
  const base64 = bytesToBase64(bytes)
  return `data:${mimeType};base64,${base64}`
}