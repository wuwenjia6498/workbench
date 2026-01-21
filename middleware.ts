import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// HTTP Basic Auth 认证配置
// 注意：生产环境中应使用环境变量而非硬编码
const BASIC_AUTH_USER = 'admin'
const BASIC_AUTH_PASSWORD = 'huiben888888'

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

  // 验证用户名和密码
  if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
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
