"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import WhatsAppButton from "@/components/whatsapp-button"


const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const observeElement = (element: HTMLElement | null, id: string) => {
    if (element && observerRef.current) {
      element.id = id
      observerRef.current.observe(element)
    }
  }

  return { visibleElements, observeElement }
}

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      creation: "Création",
      process: "Processus",
    },
    hero: {
      title: "Fakhara Loutia",
      subtitle: "L'Art des Tajines Marocains",
      welcome: "Bienvenue chez Fakhara Loutia",
      description:
        "Bienvenue chez Fakhara Loutia, où l'artisanat marocain s'exprime à travers des tajines d'exception. Nos tajines, nommés \"Fakhara Loutia\" ou \"joyau d'argile\", sont des pièces uniques, façonnées à la main par des artisans passionnés, ancrées dans des siècles de tradition marocaine. Chaque tajine est une célébration de l'héritage artistique et culturel du Maroc.",
      description2:
        "Chez Fakhara Loutia, nous transformons l'argile brute en œuvres d'art intemporelles, reflétant la beauté et l'authenticité de la poterie marocaine. Explorez notre histoire, découvrez le processus de création et plongez dans l'univers de nos tajines artisanaux.",
      whyTitle: "Pourquoi Fakhara Loutia ?",
      excellence: "Artisanat d'Excellence : Chaque tajine est façonné à la main avec un savoir-faire ancestral.",
      aesthetic: "Esthétique Traditionnelle : Nos designs capturent l'élégance intemporelle de la poterie marocaine.",
      heritage: "Héritage Culturel : Inspirés par l'âme des souks et des ateliers artisanaux du Maroc.",
      closing: "Laissez-vous emporter par l'art de Fakhara Loutia et découvrez la magie de l'artisanat marocain.",
      cta1: "Découvrir Nos Tajines",
      cta2: "En Savoir Plus",
    },
    about: {
      title: "À Propos de Nous",
      description:
        "Fakhara Loutia est né d'une passion pour l'artisanat marocain et d'un engagement à préserver un patrimoine culturel précieux. Notre nom, signifiant \"joyau d'argile\" en arabe, incarne notre mission de créer des tajines uniques qui honorent la tradition marocaine. Fondée par une équipe dévouée à l'art de la poterie, Fakhara Loutia collabore avec des artisans marocains pour produire des pièces qui allient beauté et authenticité.",
      mission:
        "Nous cherchons à faire rayonner l'art du tajine à travers le monde, en célébrant le savoir-faire des artisans qui transforment l'argile en œuvres d'art. Chaque tajine porte en lui l'histoire des mains qui l'ont façonné et des traditions qui l'ont inspiré.",
      valuesTitle: "Nos Valeurs :",
      quality: "Qualité : Utilisation d'argile naturelle et de techniques artisanales pour des pièces durables.",
      tradition: "Tradition : Respect des méthodes ancestrales de fabrication des tajines marocains.",
      authenticity: "Authenticité : Célébration de la culture marocaine à travers chaque création.",
      closing: "Rejoignez-nous pour découvrir l'essence de l'artisanat marocain avec Fakhara Loutia.",
      cta1: "Rencontrer Nos Artisans",
      cta2: "Explorer Nos Créations",
    },
    creation: {
      title: "Création",
      subtitle: "L'Art de Façonner les Tajines",
      description:
        "La création d'un tajine Fakhara Loutia est un hommage à l'artisanat marocain, mêlant tradition et savoir-faire. Chaque pièce est conçue pour capturer l'essence du Maroc à travers un design soigné et une fabrication minutieuse.",
      steps: {
        clay: {
          title: "Choix de l'Argile",
          description:
            "Nous sélectionnons une argile naturelle de haute qualité, issue des terres riches du Maroc, choisie pour sa pureté et sa robustesse.",
        },
        modeling: {
          title: "Modelage Artisanal",
          description:
            "Nos artisans, dépositaires d'un savoir-faire séculaire, façonnent chaque tajine à la main sur un tour de potier. La base large et le couvercle conique, emblèmes du design traditionnel, sont sculptés avec une précision artistique.",
        },
        drying: {
          title: "Séchage Naturel",
          description:
            "Les tajines sont séchés lentement sous le soleil marocain, renforçant leur structure tout en préservant leur caractère authentique.",
        },
        firing: {
          title: "Cuisson Traditionnelle",
          description:
            "Une cuisson dans des fours à haute température solidifie l'argile, offrant une finition lisse et une durabilité exceptionnelle.",
        },
        finishing: {
          title: "Finition Soignée",
          description:
            "Certains tajines sont ornés d'un vernis non toxique, appliqué à la main pour une touche d'élégance, tandis que d'autres conservent leur texture brute, mettant en valeur la beauté naturelle de l'argile.",
        },
      },
      uniqueTitle: "Ce Qui Rend Nos Tajines Uniques",
      design:
        "Design Iconique : Le couvercle conique et la base large incarnent l'esthétique traditionnelle marocaine.",
      materials: "Matériaux Naturels : Fabriqués à partir d'argile écologique, nos tajines respectent l'environnement.",
      artisanal:
        "Héritage Artisanal : Chaque pièce reflète le savoir-faire des artisans marocains, transmis de génération en génération.",
      closing:
        "Chaque tajine Fakhara Loutia est une œuvre d'art, conçue pour célébrer la richesse de la poterie marocaine.",
      cta: "Découvrir Notre Collection",
    },
    process: {
      title: "Processus",
      description:
        "Le processus de fabrication des tajines Fakhara Loutia est un voyage artisanal, où chaque étape est empreinte de soin, de précision et de respect des traditions marocaines. Voici les étapes détaillées qui donnent vie à nos tajines :",
      steps: [
        {
          title: "Sélection des Matières Premières",
          description:
            "Nous commençons par choisir une argile naturelle de première qualité, extraite des régions marocaines réputées pour leur sol fertile. Cette argile est rigoureusement testée pour garantir sa pureté et sa résistance.",
        },
        {
          title: "Préparation de l'Argile",
          description:
            "L'argile est pétrie et purifiée à la main pour éliminer toute impureté, assurant une consistance optimale pour le modelage. Cette étape demande une expertise artisanale et une grande patience.",
        },
        {
          title: "Façonnage sur le Tour",
          description:
            "Nos artisans utilisent des tours de potier traditionnels pour façonner la base et le couvercle conique des tajines. Chaque pièce est unique, marquée par les gestes précis et l'expérience de l'artisan.",
        },
        {
          title: "Séchage au Soleil",
          description:
            "Les tajines fraîchement modelés sont laissés à sécher naturellement sous le climat marocain. Ce processus, qui peut durer plusieurs jours, renforce l'argile et garantit sa solidité.",
        },
        {
          title: "Cuisson au Four",
          description:
            "Les pièces sont cuites dans des fours traditionnels à des températures soigneusement contrôlées. Cette étape solidifie l'argile et lui confère une finition soignée et durable.",
        }
       
      ],
      closing:
        "Ce processus artisanal garantit que chaque tajine Fakhara Loutia est une pièce unique, symbole de l'artisanat marocain et de l'amour du détail.",
      cta: "En Savoir Plus sur Nos Tajines",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      creation: "الإبداع",
      process: "العملية",
    },
    hero: {
      title: "فخارة لوطية",
      subtitle: "فن الطاجين المغربي",
      welcome: "مرحباً بكم في فخارة لوطية",
      description:
        'مرحباً بكم في فخارة لوطية، حيث تتجلى الحرفة المغربية من خلال طواجين استثنائية. طواجيننا المسماة "فخارة لوطية" أو "جوهرة الطين" هي قطع فريدة، مصنوعة يدوياً من قبل حرفيين شغوفين، متجذرة في قرون من التقاليد المغربية. كل طاجين هو احتفال بالتراث الفني والثقافي للمغرب.',
      description2:
        "في فخارة لوطية، نحول الطين الخام إلى أعمال فنية خالدة، تعكس جمال وأصالة الفخار المغربي. استكشف تاريخنا، اكتشف عملية الإبداع وانغمس في عالم طواجيننا الحرفية.",
      whyTitle: "لماذا فخارة لوطية؟",
      excellence: "حرفية متميزة: كل طاجين مصنوع يدوياً بمهارة تراثية.",
      aesthetic: "جمالية تقليدية: تصاميمنا تأسر الأناقة الخالدة للفخار المغربي.",
      heritage: "تراث ثقافي: مستوحى من روح الأسواق والورش الحرفية في المغرب.",
      closing: "دعوا أنفسكم تنجرفون مع فن فخارة لوطية واكتشفوا سحر الحرفة المغربية.",
      cta1: "اكتشف طواجيننا",
      cta2: "اعرف المزيد",
    },
    about: {
      title: "من نحن",
      description:
        'ولدت فخارة لوطية من شغف بالحرفة المغربية والتزام بالحفاظ على تراث ثقافي ثمين. اسمنا، الذي يعني "جوهرة الطين" بالعربية، يجسد مهمتنا في إنشاء طواجين فريدة تكرم التقاليد المغربية. تأسست من قبل فريق مكرس لفن الفخار، تتعاون فخارة لوطية مع الحرفيين المغاربة لإنتاج قطع تجمع بين الجمال والأصالة.',
      mission:
        "نسعى لإشعاع فن الطاجين عبر العالم، احتفالاً بمهارة الحرفيين الذين يحولون الطين إلى أعمال فنية. كل طاجين يحمل في طياته تاريخ الأيدي التي شكلته والتقاليد التي ألهمته.",
      valuesTitle: "قيمنا:",
      quality: "الجودة: استخدام الطين الطبيعي والتقنيات الحرفية لقطع متينة.",
      tradition: "التقليد: احترام الطرق التراثية في صنع الطواجين المغربية.",
      authenticity: "الأصالة: الاحتفال بالثقافة المغربية من خلال كل إبداع.",
      closing: "انضموا إلينا لاكتشاف جوهر الحرفة المغربية مع فخارة لوطية.",
      cta1: "تعرف على حرفيينا",
      cta2: "استكشف إبداعاتنا",
    },
    creation: {
      title: "الإبداع",
      subtitle: "فن تشكيل الطواجين",
      description:
        "إنشاء طاجين فخارة لوطية هو تكريم للحرفة المغربية، يمزج بين التقليد والمهارة. كل قطعة مصممة لتأسر جوهر المغرب من خلال تصميم مدروس وصناعة دقيقة.",
      steps: {
        clay: {
          title: "اختيار الطين",
          description: "نختار طيناً طبيعياً عالي الجودة، من الأراضي الغنية في المغرب، مختار لنقائه وقوته.",
        },
        modeling: {
          title: "النمذجة الحرفية",
          description:
            "حرفيونا، حملة المهارة العريقة، يشكلون كل طاجين يدوياً على عجلة الفخار. القاعدة العريضة والغطاء المخروطي، رموز التصميم التقليدي، منحوتان بدقة فنية.",
        },
        drying: {
          title: "التجفيف الطبيعي",
          description: "الطواجين تُجفف ببطء تحت الشمس المغربية، مما يقوي بنيتها مع الحفاظ على طابعها الأصيل.",
        },
        firing: {
          title: "الحرق التقليدي",
          description: "الحرق في أفران عالية الحرارة يصلب الطين، مما يوفر لمسة نهائية ناعمة ومتانة استثنائية.",
        },
        finishing: {
          title: "اللمسة الأخيرة",
          description:
            "بعض الطواجين مزينة بطلاء غير سام، مطبق يدوياً للمسة أناقة، بينما أخرى تحتفظ بملمسها الخام، مبرزة جمال الطين الطبيعي.",
        },
      },
      uniqueTitle: "ما يجعل طواجيننا فريدة",
      design: "تصميم أيقوني: الغطاء المخروطي والقاعدة العريضة يجسدان الجمالية التقليدية المغربية.",
      materials: "مواد طبيعية: مصنوعة من طين بيئي، طواجيننا تحترم البيئة.",
      artisanal: "تراث حرفي: كل قطعة تعكس مهارة الحرفيين المغاربة، المنقولة عبر الأجيال.",
      closing: "كل طاجين فخارة لوطية هو عمل فني، مصمم للاحتفال بثراء الفخار المغربي.",
      cta: "اكتشف مجموعتنا",
    },
    process: {
      title: "العملية",
      description:
        "عملية صنع طواجين فخارة لوطية هي رحلة حرفية، حيث كل خطوة مليئة بالعناية والدقة واحترام التقاليد المغربية. إليكم الخطوات المفصلة التي تحيي طواجيننا:",
      steps: [
        {
          title: "اختيار المواد الخام",
          description:
            "نبدأ باختيار طين طبيعي من الدرجة الأولى، مستخرج من المناطق المغربية المشهورة بتربتها الخصبة. هذا الطين يُختبر بدقة لضمان نقائه ومقاومته.",
        },
        {
          title: "تحضير الطين",
          description:
            "الطين يُعجن ويُنقى يدوياً لإزالة أي شوائب، مما يضمن قواماً مثالياً للنمذجة. هذه الخطوة تتطلب خبرة حرفية وصبراً كبيراً.",
        },
        {
          title: "التشكيل على العجلة",
          description:
            "حرفيونا يستخدمون عجلات فخار تقليدية لتشكيل القاعدة والغطاء المخروطي للطواجين. كل قطعة فريدة، مميزة بحركات دقيقة وخبرة الحرفي.",
        },
        {
          title: "التجفيف تحت الشمس",
          description:
            "الطواجين المشكلة حديثاً تُترك لتجف طبيعياً تحت المناخ المغربي. هذه العملية، التي قد تستغرق عدة أيام، تقوي الطين وتضمن صلابته.",
        },
        {
          title: "الحرق في الفرن",
          description:
            "القطع تُحرق في أفران تقليدية بدرجات حرارة مضبوطة بعناية. هذه الخطوة تصلب الطين وتمنحه لمسة نهائية مهذبة ومتينة.",
        }
      ],
      closing: "هذه العملية الحرفية تضمن أن كل طاجين فخارة لوطية قطعة فريدة، رمز للحرفة المغربية وحب التفاصيل.",
      cta: "اعرف المزيد عن طواجيننا",
    },
  },
}

export default function Home() {
  const [language, setLanguage] = useState<"fr" | "ar">("fr")
  const [scrollY, setScrollY] = useState(0)
  const { visibleElements, observeElement } = useScrollAnimation()

  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "ar" : "fr"))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className={`min-h-screen ${language === "ar" ? "rtl" : "ltr"}`} dir={language === "ar" ? "rtl" : "ltr"}>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrollY > 50 ? "glassmorphism shadow-2xl backdrop-blur-3xl" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-10 max-w-6xl ">
          <div className="flex justify-between items-center h-18">
            <div
              className="font-sans font-black text-4xl gradient-text cursor-pointer floating-element creative-hover"
              onClick={() => scrollToSection("home")}
            >
           <img src="10_FAKHARA LOUTIA_Export_couleur_horiz.png" alt="" className="w-32 h-10" />
            </div>

            <div
  className={`hidden md:flex gap-16 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
>
  {Object.entries(t.nav).map(([key, value]) => (
    <button
      key={key}
      onClick={() => scrollToSection(key === "home" ? "home" : key)}
      className="nav-link text-xl font-semibold text-foreground/80 hover:text-primary"
    >
      {value}
    </button>
  ))}
</div>

            <Button
              onClick={toggleLanguage}
              className="modern-card bg-gradient-to-r from-primary via-accent to-secondary  text-white border-0 px-8 py-4 rounded-2xl text-lg font-bold"
            >
              {language === "fr" ? "العربية" : "Français"}
            </Button>
          </div>
        </div>
      </nav>

    {/* Home Section - Now appears immediately without scroll animation */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden creative-bg-pattern">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/12" />

        {/* Floating background shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-accent/25 to-secondary/35 rounded-full blur-2xl floating-stagger-1" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-secondary/20 to-accent/25 rounded-full blur-3xl floating-stagger-2" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-secondary/30 to-primary/40 rounded-full blur-xl floating-stagger-3" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-primary/40 to-secondary/50 rounded-full blur-lg floating-stagger-1" />
        <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-gradient-to-br from-accent/35 to-primary/45 rounded-full blur-xl floating-stagger-2" />

        {/* Main container */}
        <div className="relative z-10 container mx-auto px-16 max-w-6xl py-20">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* Left side - Text Content (no scroll animation) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8 modern-card creative-hover p-10 rounded-3xl artistic-shadow">
                <h3 className="text-4xl font-sans font-bold gradient-text">{t.hero.welcome}</h3>
                <p className="text-2xl font-sans leading-relaxed text-foreground/90">{t.hero.description}</p>
                <p className="text-2xl font-sans leading-relaxed text-foreground/90">{t.hero.description2}</p>
              </div>

              <div className="space-y-8 modern-card creative-hover p-10 rounded-3xl artistic-shadow">
                <h4 className="text-3xl font-sans font-bold gradient-text">{t.hero.whyTitle}</h4>
                <div className="grid gap-8">
                  {[t.hero.excellence, t.hero.aesthetic, t.hero.heritage].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-8 p-6 rounded-2xl bg-gradient-to-r from-accent/15 to-secondary/15 creative-hover"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full mt-3 flex-shrink-0 pulse-glow"></div>
                      <p className="text-xl font-sans leading-relaxed text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-3xl font-sans leading-relaxed gradient-text font-bold italic">{t.hero.closing}</p>

              <div className={`flex gap-8 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                {/* CTA buttons can go here */}
              </div>
            </div>

            {/* Right side - Image (no scroll animation) */}
            <div className="lg:col-span-5 relative self-start">
              <img
                src="IMG_2310.JPG"
                alt={language === "fr" ? "Image Principale des Tajines" : "الصورة الرئيسية للطواجين"}
                className="w-full h-[700px] object-cover rounded-3xl pulse-glow floating-element border-4 border-dashed border-[#42322A]/30"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="artistic-divider"></div>

      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/30 rounded-full blur-3xl floating-stagger-1" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-br from-secondary/25 to-accent/35 rounded-full blur-2xl floating-stagger-2" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/40 rounded-full blur-xl floating-stagger-3" />

        <div className="relative z-10 container mx-auto px-16 max-w-6xl ">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div
              ref={(el) => observeElement(el, "about-content")}
              className={`lg:col-span-7 ${visibleElements.has("about-content") ? "fade-in-up" : "opacity-0"} space-y-12`}
            >
              <div className="space-y-8">
                <div className="relative">
                  <h2 className="text-6xl md:text-8xl font-sans font-black gradient-text leading-none">
                    {t.about.title}
                  </h2>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/40 to-secondary/50 rounded-full blur-lg floating-element"></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32 h-3 bg-gradient-to-r from-accent to-secondary rounded-full"></div>
                  <div className="w-20 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  <div className="w-16 h-3 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="relative modern-card p-10 rounded-3xl space-y-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/30 to-secondary/40 rounded-full blur-xl -translate-y-8 translate-x-8"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/40 to-accent/50 rounded-full blur-lg translate-x-8 translate-y-8"></div>
                  <div className="relative z-10">
                    <p className="text-2xl font-sans leading-relaxed text-foreground/90 font-medium">
                      {t.about.description}
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mt-6"></div>
                    <p className="text-2xl font-sans leading-relaxed text-foreground/90 font-medium mt-8">
                      {t.about.mission}
                    </p>
                  </div>
                </div>

                <div className="relative modern-card p-10 rounded-3xl overflow-hidden">
                  <div className="absolute top-1/2 right-0 w-40 h-40 bg-gradient-to-br from-secondary/25 to-primary/35 rounded-full blur-2xl translate-x-8"></div>
                  <div className="relative z-10">
                    <h4 className="text-3xl font-sans font-bold gradient-text mb-8 flex items-center gap-4">
                      {t.about.valuesTitle}
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full pulse-glow"></div>
                    </h4>
                    <div className="grid gap-6">
                      {[t.about.quality, t.about.tradition, t.about.authenticity].map((value, index) => (
                        <div
                          key={index}
                          className="relative p-8 rounded-2xl bg-gradient-to-r from-accent/15 to-secondary/15 border-l-6 border-accent creative-hover overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/30 rounded-full blur-lg -translate-y-4 translate-x-4"></div>
                          <p className="relative z-10 font-sans text-xl leading-relaxed text-foreground/90 font-medium">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-8">
                  <p className="text-3xl font-sans leading-relaxed gradient-text font-bold italic">{t.about.closing}</p>
                  <div className={`flex gap-8 justify-center ${language === "ar" ? "flex-row-reverse" : ""}`}>
                   
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={(el) => observeElement(el, "about-images")}
              className={`lg:col-span-5 ${visibleElements.has("about-images") ? "fade-in-right" : "opacity-0"} space-y-8`}
            >
              <div className="relative">
                <img
                  src="IMG_2318.JPG"
                  alt={language === "fr" ? "Artisans au Travail" : "الحرفيون في العمل"}
                  className="w-full h-[450px] object-cover rounded-3xl floating-element transform rotate-2 border-4 border-dashed border-[#42322A]/30"
                />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#D0CFCD]/40 to-[#42322A]/50 rounded-full blur-xl floating-stagger-1"></div>
              </div>

              <div className="relative">
                <img
                  src="IMG_2315.JPG"
                  alt={language === "fr" ? "Atelier Traditionnel" : "الورشة التقليدية"}
                  className="w-full h-[350px] object-cover rounded-3xl floating-element transform -rotate-1 translate-x-8 border-4 border-dashed border-[#42322A]/30"
                />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#D0CFCD]/40 to-[#42322A]/50 rounded-full blur-lg floating-stagger-2"></div>
              </div>

              <div className="relative">
                <img
                  src="IMG_2316.JPG"
                  alt={language === "fr" ? "Tajines Finis" : "الطواجين المكتملة"}
                  className="w-full h-[280px] object-cover rounded-3xl floating-element transform rotate-1 -translate-x-4 border-4 border-dashed border-[#42322A]/30"
                />
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#42322A]/30 to-[#D0CFCD]/40 rounded-full blur-xl floating-stagger-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="artistic-divider"></div>

      <section id="creation" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-secondary/12"></div>
  <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-accent/25 to-primary/35 rounded-full blur-3xl floating-stagger-1" />
  <div className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-br from-secondary/20 to-accent/30 rounded-full blur-3xl floating-stagger-2" />
  <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-primary/30 to-secondary/40 rounded-full blur-2xl floating-stagger-3" />

  <div className="relative z-10 container mx-auto px-16 max-w-6xl">
    <div
      ref={(el) => observeElement(el, "creation-header")}
      className={`${visibleElements.has("creation-header") ? "fade-in-down" : "opacity-0"} text-center mb-24 space-y-12`}
    >
      <div className="relative">
        <h2 className="text-6xl md:text-8xl font-sans font-black gradient-text leading-none">
          {t.creation.title}
        </h2>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent/40 to-secondary/50 rounded-full blur-xl floating-element"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/50 to-accent/60 rounded-full blur-lg floating-stagger-1"></div>
      </div>
      <h3 className="text-4xl font-sans font-bold text-accent pulse-glow">{t.creation.subtitle}</h3>
      <div className="flex justify-center gap-4">
        <div className="w-32 h-3 bg-gradient-to-r from-accent to-secondary rounded-full"></div>
        <div className="w-20 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <div className="w-16 h-3 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(t.creation.steps).map(([key], index) => (
        <div
          key={key}
          ref={(el) => observeElement(el, `creation-step-${index}`)}
          className={`${visibleElements.has(`creation-step-${index}`) ? `fade-in-${index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}` : "opacity-0"} relative group`}
        >
          <img
            src={`creation-${key}.jpg`}
            alt={language === "fr" ? `Creation step ${index + 1}` : `خطوة الإبداع ${index + 1}`}
            className="w-full h-[400px] object-cover rounded-3xl floating-element border-4 border-dashed border-[#42322A]/30"
          />
        </div>
      ))}
    </div>
  </div>
</section>
      <section id="process" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10"></div>

        <div className="relative z-10 container mx-auto px-16 max-w-6xl ">
          <div
            ref={(el) => observeElement(el, "process-header")}
            className={`${visibleElements.has("process-header") ? "fade-in-down" : "opacity-0"} text-center mb-20 space-y-8`}
          >
            <h2 className="text-5xl md:text-6xl font-sans font-black gradient-text">{t.process.title}</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto"></div>
            <div className="modern-card p-8 rounded-3xl max-w-4xl mx-auto">
              <p className="text-xl font-sans leading-relaxed text-foreground/90">{t.process.description}</p>
            </div>
          </div>

          <div className="space-y-16">
            {t.process.steps.map((step, index) => (
              <Card
                key={index}
                ref={(el) => observeElement(el, `process-step-${index}`)}
                className={`${visibleElements.has(`process-step-${index}`) ? `fade-in-${index % 2 === 0 ? "left" : "right"}` : "opacity-0"} modern-card p-10 rounded-3xl border-0`}
              >
                <div className="flex justify-center">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-black text-xl pulse-glow">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-sans font-bold gradient-text">{step.title}</h3>
                    </div>
                    <p className="text-lg font-sans leading-relaxed text-foreground/90">{step.description}</p>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                 
                 
                     <img
                      src={`process-step-${index + 1}.jpg`}
                      alt={language === "fr" ? `Étape ${index + 1}` : `الخطوة ${index + 1}`}
                      className="w-full h-80 object-cover rounded-3xl floating-element border-4 border-dashed border-[#42322A]/30"
                    />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div
            ref={(el) => observeElement(el, "process-footer")}
            className={`${visibleElements.has("process-footer") ? "fade-in-up" : "opacity-0"} text-center mt-20 space-y-8`}
          >
            <div className="modern-card p-8 rounded-3xl max-w-4xl mx-auto">
              <p className="text-2xl font-sans leading-relaxed gradient-text font-bold italic">{t.process.closing}</p>
            </div>
          
          </div>
        </div>
      </section>

      <footer
        ref={(el) => observeElement(el, "footer")}
        className={`${visibleElements.has("footer") ? "fade-in-up" : "opacity-0"} py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-accent to-secondary text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-8">
               <img src="10_FAKHARA LOUTIA_Export_blanc_horiz.png" alt="" className="w-32 h-10" />
              <p className="font-sans text-white/90 leading-relaxed text-xl">
                {language === "fr"
                  ? "L'art authentique de la poterie marocaine, transmis de génération en génération."
                  : "فن الفخار المغربي الأصيل، منقول عبر الأجيال."}
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-3xl font-sans font-bold">{language === "fr" ? "Navigation" : "التنقل"}</h4>
              <div className="space-y-6">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key === "home" ? "home" : key)}
                    className="block nav-link text-xl font-semibold text-white/90 hover:text-white"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-3xl font-sans font-bold">{language === "fr" ? "Contact" : "اتصل بنا"}</h4>
              <div className="space-y-6 text-white/90 font-sans text-xl">
                <p className="creative-hover p-2 rounded-lg">
                  {language === "fr" ? "Email: info@fakharaloutia.ma" : "البريد الإلكتروني: info@fakharaloutia.ma"}
                </p>
                <p className="creative-hover p-2 rounded-lg">
                  {language === "fr" ? "Téléphone: +212 XXX XXX XXX" : "الهاتف: +212 XXX XXX XXX"}
                </p>
                <p className="creative-hover p-2 rounded-lg">{language === "fr" ? "Maroc" : "المغرب"}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/30 mt-20 pt-10 text-center">
            <p className="text-white/80 font-sans text-xl">
              © 2024 فخارة لوطية - {language === "fr" ? "Tous droits réservés" : "جميع الحقوق محفوظة"}
            </p>
          </div>
        </div>
      </footer>
        <WhatsAppButton/>
    </div>
  
  )
}
