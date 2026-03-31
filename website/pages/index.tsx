import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  type Breadcrumb,
  FetchBlocks,
  type FetchBlocksRes,
  FetchBreadcrumbs,
  FetchPage,
  type RichTextItemResponse,
  type TitlePropertyItemObjectResponse,
} from "rotion";
import { type Link as NLink, Page } from "rotion/ui";
import Header from "@/components/Header";
import styles from "@/styles/Page.module.css";

type Props = {
  title: null | RichTextItemResponse;
  icon: string | null;
  logo: string | null;
  blocks: FetchBlocksRes;
  breadcrumbs: Breadcrumb[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const id = process.env.NOTION_TESTROOT_ID as string;
  const page = await FetchPage({ page_id: id, last_edited_time: "force" });
  let title: null | RichTextItemResponse = null;
  if ("meta" in page && page.meta?.object === "list") {
    const obj = page.meta.results.find(
      (v) => v.type === "title",
    ) as TitlePropertyItemObjectResponse;
    title = obj.title;
  }
  const logo = page.cover?.src || null;
  const icon = page.icon?.src ?? null;
  const blocks = await FetchBlocks({
    block_id: id,
    last_edited_time: page.last_edited_time,
  });
  const breadcrumbs = await FetchBreadcrumbs({ id, type: "page_id" });

  return {
    props: {
      title,
      icon,
      logo,
      blocks,
      breadcrumbs,
    },
  };
};

export default function Home({
  title: _title,
  logo,
  icon,
  blocks,
  breadcrumbs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Rotion</title>
        {icon && <link rel="icon" type="image/svg+xml" href={icon} />}
      </Head>

      <Header breadcrumbs={breadcrumbs} breadcrumb_hrefs={["/"]} />

      <div className={styles.layout}>
        <span></span>
        <div>
          <header className={styles.header}>
            {logo && (
              <div className={styles.logo}>
                <h1>
                  <Image src={logo} width={360} height={360} alt="Rotion" />
                </h1>
              </div>
            )}
          </header>

          <div className={styles.page}>
            <Page blocks={blocks} href="/[title]" link={Link as NLink} />
          </div>
        </div>
        <span></span>
      </div>
    </>
  );
}
