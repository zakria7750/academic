import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube, SiX, SiWhatsapp, SiTelegram, SiThreads } from 'react-icons/si'

export const SocialMediaButtons = () => {
  return (
    <div className="flex items-center">
        <a href="https://wa.me/967730530992"  target="_blank" rel="noopener noreferrer">
          <SiWhatsapp className="h-5 w-5 text-green-600 ml-4" />
          <span className="sr-only">واتساب</span>
        </a>
      {/*
        <a href="https://www.facebook.com/share/15RRS3Ez1q/" target="_blank" rel="noopener noreferrer">
          <SiFacebook className="h-5 w-5 text-blue-600 ml-4 mr-2" />
          <span className="sr-only">فيسبوك</span>
        </a>
      
        <a href="https://www.instagram.com/oxfordprofessionalcollege?igsh=Y2ZxOGsxcm4zd2Q2" target="_blank" rel="noopener noreferrer">
          <SiInstagram className="h-5 w-5 text-pink-600 ml-4" />
          <span className="sr-only">انستغرام</span>
        </a>

        <a className="bg-black flex justify-center items-center py-1 px-1 rounded-lg shadow-lg" href="https://www.threads.com/@oxfordprofessionalcollege" target="_blank" rel="noopener noreferrer">
          <SiThreads className="h-5 w-5 text-white" />
          <span className="sr-only">ثريدز</span>
        </a>
      
        <a href="https://www.linkedin.com/in/%D9%83%D9%84%D9%8A%D8%A9-%D8%A7%D9%83%D8%B3%D9%81%D9%88%D8%B1%D8%AF-college-126483378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
          <SiLinkedin className="h-5 w-5 text-blue-700 mr-4 ml-4" />
          <span className="sr-only">لينكد إن</span>
        </a>

        <a href="https://youtube.com/@oxfordcollege2025?si=7TfhdgVsjWnR4LwH" target="_blank" rel="noopener noreferrer">
          <SiYoutube className="h-5 w-5 text-red-600 ml-4" />
          <span className="sr-only">يوتيوب</span>
        </a>
      */}
        <a href="https://x.com/Almarifa2018?t=dT3zTEOZU_na7fY9fnoveg&s=09" target="_blank" rel="noopener noreferrer">
          <SiX className="h-5 w-5 text-black ml-4" />
          <span className="sr-only">تويتر</span>
        </a>  

        <a href="https://t.me/IuTnbgluQA2OWRk" target="_blank" rel="noopener noreferrer">
          <SiTelegram className="h-5 w-5 text-blue-500 ml-4" />
          <span className="sr-only">تيليجرام</span>
        </a>  
    </div>
  )
}
