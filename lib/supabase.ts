import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export type BoardMember = {
  id: string
  name: string
  position: string
  experience: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export type FacultyMember = {
  id: string
  name: string
  specialization: string
  biography: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Program = {
  id: string
  name: string
  type: "masters" | "doctorate" | "diploma"
  duration: string | null
  hours: number
  education_system: string | null
  fees: number
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Trainer = {
  id: string
  name: string
  specialization: string
  image_url: string | null
  created_at: string
  updated_at: string
}

export type Accreditation = {
  id: string
  full_name: string
  email: string
  phone: string
  specialization: string
  status: "pending" | "approved" | "rejected"
  admin_message: string | null
  created_at: string
  updated_at: string
}

export type Graduate = {
  id: number
  name: string
  specialization: string
  current_position: string
  success_story: string
  country: string
  graduation_year: number
  created_at: string
  updated_at: string
}

export type GraduateApplication = {
  id: number
  name: string
  email: string
  specialization: string
  current_position: string
  success_story: string
  country: string
  graduation_year: number
  status: "pending" | "approved" | "rejected"
  admin_message?: string
  created_at: string
  updated_at: string
}

export type Certificate = {
  id: string
  certificate_number: string
  certificate_image: string
  issue_date: string
  created_at: string
  updated_at: string
}

export type NewsArticle = {
  id: string
  title: string
  description: string
  image_url: string
  published_date: string
  created_at: string
  updated_at: string
}

export type NewsletterSubscription = {
  id: string
  email: string
  created_at: string
}

export type Application = {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  current_qualification: string
  desired_program: string
  desired_specialization: string
  status: "pending" | "accepted" | "rejected"
  admin_message?: string
  created_at: string
  updated_at: string
}

export type InternationalAccreditation = {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
  updated_at: string
}
