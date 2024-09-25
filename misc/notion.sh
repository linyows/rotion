#!/bin/bash

source ./website/.env

parent_id=23740912d6ac4018ab76c64e772a342a
child_id=68b8b602-fd15-47e0-8b80-760536a7868e
quote_block_id=bff5a1d2-011e-4c42-9275-f3d5dcf62021
callout_block_id=e6bcac11-9787-4e2d-bee5-609b7a6e7ab8
db_id=81781536afc6431da21721177e7bf8e0
page_id=6d6150cf068f4293a78b6fd9fa8d0181

block_id=$callout_block_id

#curl "https://api.notion.com/v1/blocks/$block_id/children?page_size=100" \
#  -H "Authorization: Bearer $NOTION_TOKEN" \
#  -H "Notion-Version: 2022-06-28"

curl "https://api.notion.com/v1/blocks/$block_id" \
  -H 'Authorization: Bearer '"$NOTION_TOKEN"'' \
  -H 'Notion-Version: 2022-06-28'

#curl "https://api.notion.com/v1/databases/$db_id" \
#  -H 'Authorization: Bearer '"$NOTION_TOKEN"'' \
#  -H 'Notion-Version: 2022-06-28'

#curl "https://api.notion.com/v1/pages/$page_id" \
#  -H 'Notion-Version: 2022-06-28' \
#  -H 'Authorization: Bearer '"$NOTION_TOKEN"''
