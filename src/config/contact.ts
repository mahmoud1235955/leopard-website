export const publicContact = {
  email: 'info@leopard.my.id',
  phoneDisplay: '01001753684',
  phoneHref: 'tel:+201001753684',
  whatsappDisplay: '01271596996',
  whatsappHref: 'https://wa.me/201271596996',
  websiteDisplay: 'leopardlogistics.com',
  websiteHref: 'https://leopardlogistics.com',
  youtubeHref: 'https://www.youtube.com/@waelelewa4660',
  mapsHref: 'https://maps.app.goo.gl/jqy63C5LVrYVmqA29',
} as const;

export const officeAddress = {
  en: 'Sheraton – Fifth District, Cairo, Egypt. In front of American National School, Building 19, Apartment 2.',
  ar: 'شيراتون - الحي الخامس، القاهرة، مصر. أمام المدرسة الأمريكية، عمارة 19، شقة 2.',
} as const;

// TODO(owner): add verified URLs before they appear on the site
export const socialLinks: {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
} = {
  facebook: 'https://www.facebook.com/people/Leopard-International-Shipping/61596439777178/',
};

/** Owner-provided public resource links. Access is governed by each provider's sharing settings. */
export const publicResources = {
  ebookLibraryUrl:
    'https://drive.google.com/drive/folders/1eLEPs1dqegNiIeW81Su0KJcOlRIJT6-u?usp=sharing',
} as const;
