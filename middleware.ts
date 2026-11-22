import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// HTTP Basic Auth 认证配置：账号密码只放在环境变量里（本仓库公开，不能写进代码）
// 本地写在 .env.local，线上在 Vercel 项目的 Environment Variables
const BASIC_AUTH_USER = process.env.WORKBENCH_USER
const BASIC_AUTH_PASSWORD = process.env.WORKBENCH_PASSWORD

/**
 * 中间件函数：对所有路由进行 HTTP Basic Auth 验证
 * @param request - Next.js 请求对象
 * @returns 认证成功则继续，失败则返回 401
 */
export function middleware(request: NextRequest) {
  // 从请求头中获取 Authorization 字段
  const authHeader = request.headers.get('authorization')

  // 如果没有提供认证信息，要求客户端进行认证
  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Lao John Workbench"',
      },
    })
  }

  // 解析 Basic Auth 凭证
  // Authorization 头格式：Basic base64(username:password)
  const auth = authHeader.split(' ')[1]
  const [user, password] = Buffer.from(auth, 'base64').toString().split(':')

  // 验证用户名和密码（环境变量没配时一律拒绝，避免空密码放行）
  if (BASIC_AUTH_USER && BASIC_AUTH_PASSWORD && user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
    // 认证成功，允许继续访问
    return NextResponse.next()
  }

  // 认证失败，返回 401 状态码
  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Lao John Workbench"',
    },
  })
}

// 配置中间件应用的路由范围
// 这里配置为对所有路由生效
export const config = {
  matcher: '/:path*',
}
