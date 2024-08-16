import { parser } from '@exodus/schemasafe'

const parse_muxip_needed = parser({
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "ads.app_name": {
      "type": "string",
      "enum": [
        "freecast",
        "Freecast",
        "FreeCast"
      ],
    },
    "ads.did": {
      "type": "string",
      "format": "uuid"
    },
    "ads.app_store_url": {
      "type": "string",
      "format": "uri",
      "minLength": 1
    },
    "ads.app_bundle": {
      "type": "string",
      "enum": [
          "com.freecast.watch"
      ],
    },
    "ads.content_genre": {
      "type": "string",
      "minLength": 1,
      "pattern": "^.*$"
    },
    "ads.rating": {
      "type": "string",
      "minLength": 1,
      "pattern": "^.*$"
    },
    "ads.ua": {
      "type": "string",
      "minLength": 10,
      "pattern": "^.*$"
    },
    "ads.h": {
      "type": "integer",
      "minimum": 100,
      "maximum": 10000
    },
    "ads.w": {
      "type": "integer",
      "minimum": 100,
      "maximum": 10000
    },
    "ads.content_channel": {
      "type": "string",
      "minLength": 1,
      "pattern": "^.*$"
    },
    "ads.ic": {
      "type": "string",
      "minLength": 1,
      "pattern": "^.*$"
    },
    "ads.ip": {
      "type": "string",
      "anyOf": [
        {"format": "ipv4" },
        {"format": "ipv6" }
      ],
      "minLength": 1
    }
  },
  "required": [
      "ads.did",
      "ads.app_name",
      "ads.app_store_url",
      "ads.app_bundle",
      "ads.content_genre",
      "ads.rating",
      "ads.ua",
      "ads.h",
      "ads.w",
      "ads.content_channel",
      "ads.ic",
      "ads.ip"
  ]
}, {includeErrors:true, allErrors:true, mode:"default"});

export { parse_muxip_needed };