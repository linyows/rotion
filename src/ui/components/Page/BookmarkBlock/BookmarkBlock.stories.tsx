import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BookmarkBlockObjectResponseEx } from '../../../../exporter/index.js'
import BookmarkBlock from './BookmarkBlock.js'

const block: BookmarkBlockObjectResponseEx = {
  object: 'block',
  id: '12345678-1234-1234-1234-1234567890ab',
  type: 'bookmark',
  parent: {
    type: 'page_id',
    page_id: '12345678-1234-1234-1234-1234567890ab',
  },
  bookmark: {
    url: 'https://github.com',
    caption: [
      {
        type: 'text',
        text: {
          content: 'GitHub is very cool website.',
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
        plain_text: 'GitHub is very cool website.',
        href: null,
      },
    ],
    site: {
      title: 'GitHub: Let’s build from here',
      desc: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and fea...',
      image: 'https://github.githubassets.com/assets/campaign-social-031d6161fa10.png',
      icon: 'https://github.com/fluidicon.png',
    },
  },
  created_time: '2024-01-07T01:52:00.000Z',
  last_edited_time: '2024-01-07T01:52:00.000Z',
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
  in_trash: false,
}

const meta = {
  title: 'Page/BookmarkBlock',
  component: BookmarkBlock,
  args: {
    block,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BookmarkBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const longTextBookmark = structuredClone(block)
longTextBookmark.bookmark.site.title =
  'Cybermouse | Libre server and cloud storage browser for Mac and Windows with support for FTP, SFTP, WebDAV, Amazon S3, OpenStack Swift, Backblaze B2, Microsoft Azure & OneDrive, Google Drive and Dropbox'
longTextBookmark.bookmark.site.desc =
  'Download for macOS or Windows Cyberduck is a libre server and cloud storage browser for Mac and Windows with support for FTP, SFTP, WebDAV, Amazon S3, OpenStack Swift, Backblaze B2, Microsoft Azure & OneDrive, Google Drive and Dropbox.$(document).ready((()=>{let a=0;selected=a;if(navigator.userAgent.toLowerCase().indexOf(`windows`)>-1){selected=2};$(`#screenshots`).awShowcase({selected:selected,auto:!1,interval:3000,continuous:!1,loading:!0,arrows:!1,buttons:!1,mousetrace:!1,pauseonover:!0,transition:`fade`,transition_speed:400,show_caption:`onhover`,thumbnails:!0,thumbnails_position:`outside-last`,thumbnails_direction:`vertical`,thumbnails_slidex:a})})) Cyberduck  Mountain Duck   CLI Connecting to every server. With an easy-to-use interface, connect to servers, enterprise file sharing and cloud storage. You can find connection profiles for popular hosting service providers.  FTPA widely tested FTP (File Transfer Protocol) implementation for the best interoperability with support for FTP over secured SSL/TLS connections.  SFTPWith support for strong ciphers, public key and two factor authentication. Read settings from your existing OpenSSH configuration.  WebDAVWith interoperability for ownCloud, box.com, Sharepoint and BigCommerce and many other WebDAV servers. TLS mutual (two-way) authentication with client certificate.  SMBAccess Windows File Shares or a Samba Linux Server.  OpenStack SwiftConnect to Rackspace Cloudfiles or any other OpenStack Swift cloud storage providers.  Google Cloud StorageConnect to buckets in Google Cloud Storage and configure as a website endpoint.  S3Connect to any Amazon S3 storage region with support for large file uploads.  AzureAccess Microsoft Azure Cloud storage on your desktop.  Backblaze B2Mount the low cost cloud storage on your desktop.  DRACOONVersion 6Enterprise cloud service made in Germany.  BoxVersion 8.2Leading organizations secure their data with Box.  NextcloudVersion 7Connect to your own on-premise Nextcloud installation with ease.Create share links and view and revert previous versions.  Google DriveAccess Google Drive without synchronising documents to your local disk. With URL reference files on mounted volume to open Google Docs documents in the web browser.  DropboxAccess Dropbox without synchronising documents to your local disk.  OneDriveVersion 6Connect OneDrive Personal, OneDrive Business and Sharepoint Online.  Files.comVersion 7Fast, affordable, and available in 7 worldwide regions.  ownCloudVersion 7Support for ownCloud Infinite Scale with authentication using OpenID Connect.Create share links and view and revert previous versions. Cryptomator. Client side encryption with Cryptomator interoperable vaults to secure your data on any server or cloud storage. Version 6 Filename Encryption File and directory names are encrypted, directory structures are obfuscated. File Content Encryption Every file gets encrypted individually. Secure and Trustworthy with Open Source No backdoors. No registration or account required. Edit any file with your preferred editor.  To edit files, a seamless integration with any external editor application makes it easy to change content quickly. Edit any text or binary file on the server in your preferred application. Share files.  Web URL Quickly copy or open the corresponding HTTP URLs of a selected file in your web browser. Includes CDN and pre-signed URLs for S3.Distribute your content in the cloud. Both Amazon CloudFront and Akamai content delivery networks (CDN) can be easily configured to distribute your files worldwide from edge locations. Connect to any server using FTP, SFTP or WebDAV and configure it as the origin of a new Amazon CloudFront CDN distribution.  Amazon CloudFront Manage custom origin, basic and streaming CloudFront distributions. Toggle deployment, define CNAMEs, distribution access logging and set the default index file.First class bookmarking.  Organize your bookmarks with drag and drop and quickly search using the filter field.  Files Drag and drop bookmarks to the Finder.app and drop files onto bookmarks to upload. Spotlight Spotlight Importer for bookmark files. History History of visited servers with timestamp of last access. Import Import Bookmarks from third-party applications.Browse with ease. Browse and move your files quickly in the browser with caching enabled for the best performance. Works with any character encoding for the correct display of Umlaute, Japanese and Chinese. Quick LookQuickly preview files with Quick Look. Press the space key to preview files like in Finder.app without explicitly downloading.AccessibleThe outline view of the browser allows to browse large folder structures efficiently. Cut & paste or drag & drop files to organize.Transfer anything. Limit the number of concurrent transfers and filter files using a regular expression. Resume both interrupted download and uploads. Recursively transfer directories. Download and UploadDrag and drop to and from the browser to download and upload.CopyCopy files directly between servers.SynchronizationSynchronize local with remote directories (and vice versa) and get a preview of affected files before any action is taken.Integration with system technologies. A native citizen of Mac OS X and Windows. Notification center, Gatekeeper and Retina resolution. KeychainAll passwords are stored in the system Keychain as Internet passwords available also to third party applications. Certificates are validated using the trust settings in the Keychain.'
longTextBookmark.bookmark.site.image = ''
longTextBookmark.bookmark.site.icon = ''
longTextBookmark.bookmark.caption = []
export const LongText: Story = {
  args: {
    block: longTextBookmark,
  },
}

const emptyDescBookmark = structuredClone(block)
emptyDescBookmark.bookmark.site.title = 'Hello World'
emptyDescBookmark.bookmark.site.desc = ''
emptyDescBookmark.bookmark.site.image = ''
emptyDescBookmark.bookmark.site.icon = ''
emptyDescBookmark.bookmark.caption = []
export const EmptyDesc: Story = {
  args: {
    block: emptyDescBookmark,
  },
}

const emptyTitleBookmark = structuredClone(block)
emptyTitleBookmark.bookmark.site.title = ''
emptyTitleBookmark.bookmark.site.desc = ''
emptyTitleBookmark.bookmark.site.image = ''
export const EmptyTitle: Story = {
  args: {
    block: emptyTitleBookmark,
  },
}
