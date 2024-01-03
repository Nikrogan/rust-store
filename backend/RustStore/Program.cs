using AspNet.Security.OpenId.Steam;
using DAL;
using DAL.Interfaces;
using DAL.Repositories;
using Domain.Entity;
using Microsoft.AspNetCore.Authentication.Cookies;
using RustStats.Service.Implementations;
using RustStats.Service.Interfaces;
using Service.Implementations;
using Service.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ApplicationDbContext>();

builder.Services.AddScoped<IBaseRepository<BaseUser>, UsersRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISteamApiService, SteamApiService>();

builder.Services.AddHttpClient<SteamApiService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = SteamAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie()
.AddSteam(options =>
{
    options.ApplicationKey = "5E7019B40836C7B11626E328734CB003";
    options.CallbackPath = "/api/User/steam-callback";
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthorization();
//app.UseAuthentication();

app.MapControllers();

app.Run();
