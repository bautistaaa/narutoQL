#!/bin/bash

if [[ -n "${ENV}" ]]; then
  npm run serve
else
  npm run dev
fi

