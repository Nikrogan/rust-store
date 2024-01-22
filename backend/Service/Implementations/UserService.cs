using System.Security.Claims;
using Domain.Enum;
using DAL.Interfaces;
using Domain.Entity;
using Domain.Response;
using Service.Interfaces;
using MongoDB.Driver;
using RustStats.Service.Interfaces;
using Newtonsoft.Json.Linq;

namespace Service.Implementations
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<BaseUser> _accountRepository;
        private readonly ISteamApiService _steamApiService;

        public UserService(IBaseRepository<BaseUser> accountRepository, ISteamApiService steamApiService)
        {
            _accountRepository = accountRepository;
            _steamApiService = steamApiService;
        }

        public async Task<IBaseResponse<BaseUser>> CreateUser(BaseUser viewModel)
        {
            try
            {

                var User = new BaseUser()
                {
                    DisplayName = viewModel.DisplayName,
                    SteamId = viewModel.SteamId,
                    AvatarUrl = viewModel.AvatarUrl,
                    Balance = viewModel.Balance,
                    Role = Role.Default,
                    PersonalDiscount = viewModel.PersonalDiscount,
                    Basket = new List<BaseProduct>()
                };

                await _accountRepository.Add(User);

                return new BaseResponse<BaseUser>()
                {
                    StatusCode = StatusCode.OK,
                    Data = User
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[CreateUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteUser(string id)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.Id == id);

                if (element == null)
                {
                    baseResponse.Description = "Resource not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _accountRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<bool>> DeleteUserBySteamId(string steamId)
        {
            var baseResponse = new BaseResponse<bool>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var element = allElements.FirstOrDefault(x => x.SteamId == steamId);

                if (element == null)
                {
                    baseResponse.Description = "Resource not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                await _accountRepository.Delete(element);

                baseResponse.Data = true;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<bool>()
                {
                    Description = $"[DeleteUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> EditElement(BaseUser viewModel)
        {
            try
            {
                var allElements = await _accountRepository.GetAll();
                var user = allElements.FirstOrDefault(x => x.Id == viewModel.Id);
                if (user == null)
                {
                    return new BaseResponse<BaseUser>()
                    {
                        Description = "Element not found",
                        StatusCode = StatusCode.ElementNotFound
                    };
                }

                user.DisplayName = viewModel.DisplayName;
                user.AvatarUrl = viewModel.AvatarUrl;
                user.SessionId = viewModel.SessionId;
                user.LastAuth = viewModel.LastAuth;

                await _accountRepository.Update(user);

                return new BaseResponse<BaseUser>()
                {
                    Data = user,
                    StatusCode = StatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[EditAccount] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<IEnumerable<BaseUser>>> GetAllUsers()
        {
            var baseResponse = new BaseResponse<IEnumerable<BaseUser>>();
            try
            {
                var resource = await _accountRepository.GetAll();
                if (resource == null)
                {
                    baseResponse.Description = "No one elements";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<IEnumerable<BaseUser>>()
                {
                    Description = $"[GetAllUsers] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserById(string id)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x=>x.Id == id);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserByName(string name)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.DisplayName == name);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserById] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserBySteamId(string steamId)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SteamId == steamId);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserBySteamId] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        public async Task<IBaseResponse<BaseUser>> GetUserBySessionId(string sessionId)
        {
            var baseResponse = new BaseResponse<BaseUser>();
            try
            {
                var allElements = await _accountRepository.GetAll();
                var resource = allElements.FirstOrDefault(x => x.SessionId == sessionId);
                if (resource == null)
                {
                    baseResponse.Description = "Account not found";
                    baseResponse.StatusCode = StatusCode.ElementNotFound;
                    return baseResponse;
                }

                if((resource.LastAuth - DateTime.Now).TotalHours >= 12)
                {
                    baseResponse.Description = "Session time out";
                    baseResponse.StatusCode = StatusCode.SessionTimeOut;
                    return baseResponse;
                }

                baseResponse.Data = resource;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<BaseUser>()
                {
                    Description = $"[GetUserBySteamId] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }


        public async Task<IBaseResponse<ClaimsIdentity>> LoginUser(string steamID)
        {
            var baseResponse = new BaseResponse<ClaimsIdentity>();
            try
            {

                BaseUser user;
                var serviceResponse = await GetUserBySteamId(steamID);
                if (serviceResponse.StatusCode == StatusCode.OK)
                {

                    user = serviceResponse.Data;
                }
                else if (serviceResponse.StatusCode == StatusCode.ElementNotFound)
                {
                    JObject playerInfo = await _steamApiService.GetPlayerInfoAsync(steamID);
                    var avatarUrl = _steamApiService.GetAvatarUrl(playerInfo);
                    var displayName = _steamApiService.GetDisplayName(playerInfo);

                    user = new BaseUser
                    {
                        DisplayName = displayName,
                        SteamId = steamID,
                        AvatarUrl = avatarUrl,
                        Balance = 0,
                        Role = Role.Owner
                    };

                    await CreateUser(user);
                }
                else
                {
                    baseResponse.Description = "Auth error";
                    baseResponse.StatusCode = StatusCode.InternalServerError;
                    return baseResponse;
                }

                var result = AuthenticateAsync(user);

                baseResponse.Data = result;
                baseResponse.StatusCode = StatusCode.OK;
                return baseResponse;
            }
            catch (Exception ex)
            {
                return new BaseResponse<ClaimsIdentity>()
                {
                    Description = $"[LoginUser] : {ex.Message}",
                    StatusCode = StatusCode.InternalServerError
                };
            }
        }

        private static ClaimsIdentity AuthenticateAsync(BaseUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.SteamId),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
            };

            return new ClaimsIdentity(claims, "ApplicationCookie",
                ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        }

        
    }
}
