import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NextApiRequest, NextApiResponse } from "next"
import { authJwt } from './middlewareFunctions/authMiddleware';
import { authCode } from './middlewareFunctions/codeMiddleware';
import clientPromise from './lib/db';

 

export default async function middleware(req: NextRequest , apiReq :NextApiRequest , apiRes :NextApiResponse) {
 // await clientPromise()
  if (req.nextUrl.pathname.startsWith('/api/products') && req.method==='POST'
    || req.nextUrl.pathname.startsWith('/api/brands') && req.method==='POST'
    || req.nextUrl.pathname.startsWith('/api/categories') && req.method==='POST'
    || req.nextUrl.pathname.startsWith('/api/coupons') && req.method==='POST'
    || req.nextUrl.pathname.startsWith('/api/reviews') && req.method==='POST'
    || req.nextUrl.pathname.startsWith('/api/users') && req.method==='POST'
  )
   {
   // authJwt(apiReq,apiRes)
    //authCode(apiReq,apiRes)
    NextResponse.next()
  }
  else if (req.nextUrl.pathname.startsWith('/api/users')
        || req.nextUrl.pathname.startsWith('/api/users/profile')
  )
  {
   // authJwt(apiReq,apiRes)
    NextResponse.next()
  }

}