// SPDX-License-Identifier: MIT
// Copyright © 2026 Paul Puhnaty

export * from "./interfaces";
export * from "./api";

import * as interfaces from "./interfaces";
import * as api from "./api";

export default {
  ...interfaces,
  ...api,
};
