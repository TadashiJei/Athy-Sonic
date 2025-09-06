# Athy API Docs

This folder contains the OpenAPI specification for Athy's S3-compatible gateway.

## Files

- `openapi.yaml` — OpenAPI 3.0 spec for core object operations (Put/Get/Delete/List)

## Viewing the API

- Online viewer:
  - Use https://editor.swagger.io/ and paste or import `openapi.yaml`.
- VS Code:
  - Install the "OpenAPI (Swagger) Editor" extension and open `openapi.yaml`.
- Redocly CLI (optional):
  - `npm i -g @redocly/cli`
  - `redocly preview-docs docs/openapi.yaml`

## Next Steps

- Expand the spec with authentication details (SigV4) and additional endpoints.
- Add error schemas and standardized problem responses.
- Generate SDKs from the spec once endpoints stabilize.
