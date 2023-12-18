#!/bin/bash

source ./.env

parent_id=23740912d6ac4018ab76c64e772a342a
child_id=68b8b602-fd15-47e0-8b80-760536a7868e
quote_block_id=bff5a1d2-011e-4c42-9275-f3d5dcf62021

block_id=$quote_block_id

curl "https://api.notion.com/v1/blocks/$block_id/children?page_size=100" \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28"

#curl "https://api.notion.com/v1/blocks/$block_id" \
#  -H "Authorization: Bearer $key" \
#  -H "Notion-Version: 2022-06-28"
