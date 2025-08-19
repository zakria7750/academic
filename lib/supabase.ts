import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const createDummyClient = () => ({
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
      }),
      then: (resolve: any) => resolve({ data: [], error: null }),
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: null, error: null }),
      then: (resolve: any) => resolve({ data: null, error: null }),
    }),
    update: () => ({
      eq: () => ({
        select: () => Promise.resolve({ data: null, error: null }),
        then: (resolve: any) => resolve({ data: null, error: null }),
      }),
      then: (resolve: any) => resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
      then: (resolve: any) => resolve({ data: null, error: null }),
    }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
  },
})

export const supabase =
  isSupabaseConfigured && supabaseUrl && supabaseAnonKey
    ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
    : createDummyClient()

export function createClient() {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return createDummyClient()
  }
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

export type TrainingCourse = {
  id: string
  name: string
  duration: string
  hours: number
  education_system: string
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
