import { getAuth } from "firebase/auth"

import { app } from "@/dal"

export const auth = getAuth(app)
