import type { Meta, StoryObj } from '@storybook/react-vite'
import type { EmbedBlockObjectResponseEx } from '../../../../exporter'
import EmbedBlock from './EmbedBlock'

const block: EmbedBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  created_time: '',
  last_edited_time: '',
  created_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  last_edited_by: {
    object: 'user',
    id: '12345678-1234-1234-1234-1234567890ab',
  },
  has_children: false,
  archived: false,
  type: 'embed',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  embed: {
    caption: [
      {
        type: 'text',
        text: {
          content: 'Nice',
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: 'Nice',
        href: null,
      },
    ],
    url: 'https://www.instagram.com/p/Cu2DjxmvLeI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    html: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/Cu2DjxmvLeI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> </blockquote> <script async src="//www.instagram.com/embed.js"></script>',
  },
  in_trash: false,
}

const meta = {
  title: 'Page/EmbedBlock',
  component: EmbedBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmbedBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Instagram: Story = {}

const x = structuredClone(block)
x.embed.url = 'https://twitter.com/jack/status/1247616214769086465'
x.embed.html = '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I’m moving $1B of my Square equity (~28% of my wealth) to <a href="https://twitter.com/hashtag/startsmall?src=hash&amp;ref_src=twsrc%5Etfw">#startsmall</a> LLC to fund global COVID-19 relief. After we disarm this pandemic, the focus will shift to girl’s health and education, and UBI. It will operate transparently, all flows tracked here: <a href="https://t.co/hVkUczDQmz">https://t.co/hVkUczDQmz</a></p>&mdash; jack (@jack) <a href="https://twitter.com/jack/status/1247616214769086465?ref_src=twsrc%5Etfw">April 7, 2020</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n\n'
export const Twitter: Story = {
  args: {
    block: x,
  },
}

const sd = structuredClone(block)
sd.embed.url = 'https://speakerdeck.com/lara/designing-for-performance'
sd.embed.html = '<iframe id="talk_frame_78036" class="speakerdeck-iframe" src="//speakerdeck.com/player/64c73790385101315ae85eae0478e863" width="710" height="399" style="aspect-ratio:710/399; border:0; padding:0; margin:0; background:transparent;" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen"></iframe>\n'
export const Speakerdeck: Story = {
  args: {
    block: sd,
  },
}

const ss = structuredClone(block)
ss.embed.url = 'https://www.slideshare.net/slideshow/storytelling-for-the-web-integrate-storytelling-in-your-design-process/269527754'
ss.embed.html = '<iframe src="https://www.slideshare.net/slideshow/embed_code/key/s0jgpCg83mwgH?startSlide=1" width="100%" height="450" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:0;" allowfullscreen></iframe>'
export const Slideshare: Story = {
  args: {
    block: ss,
  },
}

const am = structuredClone(block)
am.embed.url = 'https://music.apple.com/jp/album/the-lo-fis/1540065822'
am.embed.html = '<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/jp/album/the-lo-fis/1540065822"></iframe>'
export const AppleMusic: Story = {
  args: {
    block: am,
  },
}

// @ts-ignore
const googleMapKey = import.meta.env.STORYBOOK_GOOGLEMAP_KEY
const latitude = '33.5838302'
const longitude = '130.3657052'
const gm = structuredClone(block)
gm.embed.url = 'https://www.google.com/maps/@33.5838302,130.3657052,14z?entry=ttu'
gm.embed.html = `<iframe width="100%" height="100%" frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/view?key=${googleMapKey}&center=${latitude},${longitude}&zoom=14" allowfullscreen> </iframe>`
// gm.embed.html = `<iframe width="100%" height="450" frameborder="0" style="border:0" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=${googleMapKey}&q=%E7%A6%8F%E5%B2%A1%E5%B8%82%E5%BD%B9%E6%89%80" allowfullscreen> </iframe>`
export const GoogleMaps: Story = {
  args: {
    block: gm,
  },
}

const tiktok = structuredClone(block)
tiktok.embed.url = 'https://www.tiktok.com/@theweeknd/video/7206051055564508462?is_from_webapp=1&sender_device=pc&web_id=7365681356522685970'
tiktok.embed.html = '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@theweeknd/video/7206051055564508462" data-video-id="7206051055564508462" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@theweeknd" href="https://www.tiktok.com/@theweeknd?refer=embed">@theweeknd</a> 🌹 @hbo @hbomax <a title="dieforyou" target="_blank" href="https://www.tiktok.com/tag/dieforyou?refer=embed">#dieforyou</a> <a target="_blank" title="♬ Die For You - The Weeknd" href="https://www.tiktok.com/music/Die-For-You-6928589404693628929?refer=embed">♬ Die For You - The Weeknd</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>'
export const Tiktok: Story = {
  args: {
    block: tiktok,
  },
}
