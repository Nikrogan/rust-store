using Domain.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Service.Interfaces;
using System.Net;

namespace Service
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class SessionAuthorizeAttribute : TypeFilterAttribute
    {
        //public int Role { get; set; }
        public SessionAuthorizeAttribute(int role = 0) : base(typeof(SessionAuthorizeFilter))
        {
            //Role = role;
            Arguments = new object[] { role };
        }

        private class SessionAuthorizeFilter : IAsyncAuthorizationFilter
        {
            private readonly IUserService _userService;
            private readonly int _role;

            public SessionAuthorizeFilter(IUserService userService, int role)
            {
                _userService = userService;
                _role = role;
            }

            public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
            {
                if (!context.HttpContext.Request.Cookies.TryGetValue("session", out var jwt) || string.IsNullOrEmpty(jwt))
                {
                    SetUnauthorizedResult(context);
                    return;
                }

                var user = await _userService.GetUserBySessionId(jwt);

                if (user.StatusCode != Domain.Enum.StatusCode.OK)
                {
                    SetUnauthorizedResult(context);
                    return;
                }

                if (_role != 0 && user.Data.Role < (Domain.Enum.Role)_role)
                {
                    SetForbiddenResult(context);
                    return;
                }

                context.HttpContext.Items["CurrentUser"] = user.Data;
            }

            private void SetUnauthorizedResult(AuthorizationFilterContext context)
            {
                var responseModel = new BaseServerResponse<string>(null, Domain.Enum.StatusCode.AccessDenied);
                context.Result = new ObjectResult(responseModel)
                {
                    StatusCode = (int)HttpStatusCode.Unauthorized
                };
            }

            private void SetForbiddenResult(AuthorizationFilterContext context)
            {
                var responseModel = new BaseServerResponse<string>(null, Domain.Enum.StatusCode.AccessDenied);
                context.Result = new ObjectResult(responseModel)
                {
                    StatusCode = (int)HttpStatusCode.Forbidden
                };
            }
        }
    }
}
