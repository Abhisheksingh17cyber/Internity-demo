import { PrismaClient, ProjectCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.projectMetric.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.siteSetting.deleteMany();

  const projects = [
    {
      slug: "emirates-brand-film",
      title: "Emirates Brand Film",
      titleAr: "فيلم علامة الإمارات التجارية",
      brief: "A cinematic brand film showcasing the essence of luxury travel and world-class hospitality.",
      briefAr: "فيلم سينمائي يعرض جوهر السفر الفاخر والضيافة العالمية.",
      category: ProjectCategory.CORPORATE,
      client: "Emirates Airlines",
      year: 2025,
      featured: true,
      order: 1,
      thumbnailUrl: "/images/placeholder-thumb-1.jpg",
      videoUrl: "/videos/hero-placeholder.mp4",
      challenge: "Create a film that captures the essence of luxury travel while maintaining authenticity and emotional resonance with a global audience spanning multiple cultures and demographics.",
      challengeAr: "إنشاء فيلم يجسد جوهر السفر الفاخر مع الحفاظ على الأصالة والتأثير العاطفي لجمهور عالمي.",
      approach: "We employed a team of 30 across 5 international locations, utilizing aerial cinematography, intimate storytelling, and a carefully curated soundtrack to weave together a narrative that transcends language barriers.",
      approachAr: "وظّفنا فريقاً من 30 شخصاً عبر 5 مواقع دولية، مستخدمين التصوير الجوي والسرد القصصي الحميم.",
      result: "The film garnered over 2.5 million views in its first week, increased brand engagement by 45%, and received recognition at three international film festivals.",
      resultAr: "حصد الفيلم أكثر من 2.5 مليون مشاهدة في أسبوعه الأول، وزاد التفاعل مع العلامة التجارية بنسبة 45%.",
      publishedAt: new Date("2025-06-15"),
    },
    {
      slug: "dubai-expo-highlights",
      title: "Dubai Expo Highlights",
      titleAr: "أبرز فعاليات إكسبو دبي",
      brief: "Capturing the innovation and cultural diversity of Dubai Expo through a series of short films.",
      briefAr: "التقاط الابتكار والتنوع الثقافي لإكسبو دبي من خلال سلسلة من الأفلام القصيرة.",
      category: ProjectCategory.EVENT,
      client: "Dubai Expo",
      year: 2025,
      featured: true,
      order: 2,
      thumbnailUrl: "/images/placeholder-thumb-2.jpg",
      challenge: "Document the scale and diversity of Expo while maintaining a cohesive narrative thread across multiple short films.",
      approach: "Deployed multiple camera crews simultaneously across pavilions, using real-time coordination to capture spontaneous moments alongside planned sequences.",
      result: "Produced 12 short films viewed over 5 million times collectively, becoming the most-shared content series from the event.",
      publishedAt: new Date("2025-04-20"),
    },
    {
      slug: "luxury-auto-commercial",
      title: "Luxury Auto Campaign",
      titleAr: "حملة السيارات الفاخرة",
      brief: "A high-octane commercial campaign for a premium automotive brand launching in the Middle East.",
      briefAr: "حملة إعلانية عالية الأداء لعلامة تجارية فاخرة للسيارات.",
      category: ProjectCategory.COMMERCIAL,
      client: "Premium Motors",
      year: 2024,
      featured: true,
      order: 3,
      thumbnailUrl: "/images/placeholder-thumb-3.jpg",
      challenge: "Convey the power and elegance of the vehicle while adhering to strict brand guidelines and regional advertising standards.",
      approach: "Shot across the UAE desert and Dubai cityscape using specialized camera rigs, drone cinematography, and precision driving coordinators.",
      result: "Campaign achieved 180% of target impressions, contributed to a 35% increase in regional test-drive bookings.",
      publishedAt: new Date("2024-11-10"),
    },
    {
      slug: "heritage-documentary",
      title: "Voices of Heritage",
      titleAr: "أصوات التراث",
      brief: "An intimate documentary exploring the preservation of traditional craftsmanship in the UAE.",
      briefAr: "فيلم وثائقي حميم يستكشف الحفاظ على الحرف التقليدية في الإمارات.",
      category: ProjectCategory.DOCUMENTARY,
      client: "UAE Cultural Foundation",
      year: 2024,
      featured: false,
      order: 4,
      thumbnailUrl: "/images/placeholder-thumb-1.jpg",
      challenge: "Respectfully document cultural traditions while making the content engaging for younger audiences.",
      approach: "Spent 6 months embedded with artisan communities, building trust and capturing authentic stories through observational filmmaking.",
      result: "Selected for screening at Abu Dhabi Film Festival, streamed by a major platform, and used in educational curricula.",
      publishedAt: new Date("2024-08-05"),
    },
    {
      slug: "fintech-product-launch",
      title: "FinTech Product Launch",
      titleAr: "إطلاق منتج التكنولوجيا المالية",
      brief: "A dynamic product launch film combining motion graphics with live-action storytelling.",
      briefAr: "فيلم إطلاق منتج ديناميكي يجمع بين الرسوم المتحركة والسرد الحي.",
      category: ProjectCategory.ANIMATION,
      client: "PayFlow Technologies",
      year: 2024,
      featured: false,
      order: 5,
      thumbnailUrl: "/images/placeholder-thumb-2.jpg",
      challenge: "Explain complex financial technology in an accessible and visually compelling way within a 90-second runtime.",
      approach: "Combined 3D product visualization with real user testimonials, using kinetic typography and fluid transitions to maintain pace.",
      result: "Video achieved a 72% completion rate on social platforms, well above the industry average of 40%.",
      publishedAt: new Date("2024-06-18"),
    },
    {
      slug: "fashion-week-coverage",
      title: "Fashion Week Coverage",
      titleAr: "تغطية أسبوع الموضة",
      brief: "Behind-the-scenes and runway coverage for Dubai Fashion Week's premium showcase.",
      briefAr: "تغطية كواليس والعروض لأسبوع الموضة في دبي.",
      category: ProjectCategory.SOCIAL,
      client: "Dubai Fashion Council",
      year: 2025,
      featured: true,
      order: 6,
      thumbnailUrl: "/images/placeholder-thumb-3.jpg",
      challenge: "Deliver real-time social content while simultaneously producing a polished recap film.",
      approach: "Operated dual teams: a fast-turnaround social squad and a cinema-grade production crew, sharing footage via cloud-based workflows.",
      result: "Generated 50+ social clips with 8M total impressions, and a 4-minute recap film featured by fashion publications.",
      publishedAt: new Date("2025-01-25"),
    },
  ];

  for (const project of projects) {
    const created = await prisma.project.create({ data: project });

    await prisma.projectMetric.createMany({
      data: [
        { projectId: created.id, label: "Views", labelAr: "المشاهدات", value: 2500000, suffix: "M", order: 1 },
        { projectId: created.id, label: "Engagement", labelAr: "التفاعل", value: 45, suffix: "%", order: 2 },
        { projectId: created.id, label: "Awards", labelAr: "الجوائز", value: 3, suffix: "+", order: 3 },
      ],
    });

    await prisma.galleryImage.createMany({
      data: [
        { projectId: created.id, url: "/images/placeholder-thumb-1.jpg", alt: "Behind the scenes", altAr: "خلف الكواليس", order: 1 },
        { projectId: created.id, url: "/images/placeholder-thumb-2.jpg", alt: "Production shot", altAr: "لقطة إنتاج", order: 2 },
        { projectId: created.id, url: "/images/placeholder-thumb-3.jpg", alt: "Final frame", altAr: "الإطار النهائي", order: 3 },
      ],
    });
  }

  await prisma.siteSetting.createMany({
    data: [
      { key: "hero_video_url", value: "/videos/hero-placeholder.mp4", type: "URL" as const, group: "homepage" },
      { key: "contact_email", value: "hello@internity.ae", type: "TEXT" as const, group: "contact" },
      { key: "contact_phone", value: "+971 4 XXX XXXX", type: "TEXT" as const, group: "contact" },
      { key: "contact_address", value: "Dubai Media City, Dubai, UAE", valueAr: "مدينة دبي للإعلام، دبي، الإمارات", type: "TEXT" as const, group: "contact" },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
