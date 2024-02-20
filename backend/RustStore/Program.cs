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
            .WithOrigins("sandbox.paypal.com")
            .WithOrigins("paypal.com")
            .WithOrigins("turringrust.ru")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
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
