using AspNet.Security.OpenId.Steam;
using DAL;
using DAL.Interfaces;
using DAL.Repositories;
using Domain.Entity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using RustStats.Service.Implementations;
using RustStats.Service.Interfaces;
using Service.Implementations;
using Service.Interfaces;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000")
            .WithOrigins("http://127.0.0.1:3000")
            .WithOrigins("https://localhost:3000")
            .WithOrigins("https://127.0.0.1:3000")
            .WithOrigins("steamcommunity.com")
            .WithOrigins("turringrust.ru")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

//builder.Services.AddDataProtection()
//            .UseCryptographicAlgorithms(new AuthenticatedEncryptorConfiguration()
//            {
//                EncryptionAlgorithm = EncryptionAlgorithm.AES_256_GCM,
//                ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
//            })
//            .PersistKeysToFileSystem(new DirectoryInfo("/app/keys"));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ApplicationDbContext>();

builder.Services.AddScoped<IBaseRepository<BaseUser>, UsersRepository>();
builder.Services.AddScoped<IBaseRepository<BaseProduct>, ProductsRepository>();
builder.Services.AddScoped<IBaseRepository<BaseNews>, NewsRepository>();
builder.Services.AddScoped<IBaseRepository<BasePayment>, PaymentRepository>();
builder.Services.AddScoped<IBaseRepository<BasePromo>, PromoRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPromoService, PromoService>();
builder.Services.AddScoped<ISteamApiService, SteamApiService>();


builder.Services.AddHttpClient<SteamApiService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    //options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = SteamAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None; // или SameSiteMode.Strict, SameSiteMode.Lax
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Обязательно использовать Secure, если SameSite=None
})
.AddSteam(options =>
{
    options.ApplicationKey = "5E7019B40836C7B11626E328734CB003";
    options.CallbackPath = "/api/v1/steam-callback";
    options.Realm = "https://localhost:5000";
});



var app = builder.Build();


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};
app.UseWebSockets(webSocketOptions);


app.UseAuthorization();
app.UseAuthentication();


app.MapControllers();

app.Run();
