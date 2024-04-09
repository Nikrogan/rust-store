using DAL;
using DAL.Interfaces;
using DAL.Repositories;
using Domain.Entity;
using RustStats.Service.Implementations;
using RustStats.Service.Interfaces;
using Service.Implementations;
using Service.Interfaces;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "redis:6379";
    options.InstanceName = null; // Имя экземпляра Redis
});


builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ApplicationDbContext>();

builder.Services.AddScoped<IBaseRepository<BaseUser>, UsersRepository>();
builder.Services.AddScoped<IBaseRepository<BaseProduct>, ProductsRepository>();
builder.Services.AddScoped<IBaseRepository<BaseNews>, NewsRepository>();
builder.Services.AddScoped<IBaseRepository<BasePayment>, PaymentRepository>();
builder.Services.AddScoped<IBaseRepository<BasePromo>, PromoRepository>();
builder.Services.AddScoped<IBaseRepository<BaseShopFilter>, ShopFiltersRepository>();
builder.Services.AddScoped<IBaseRepository<BaseServer>, ServerRepository>();
builder.Services.AddScoped<IBaseRepository<BasePlayerCheck>, PlayerCheckSheetRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPromoService, PromoService>();
builder.Services.AddScoped<ISteamApiService, SteamApiService>();
builder.Services.AddScoped<IShopFiltersService, ShopFiltersService>();
builder.Services.AddScoped<IServerService, ServerService>();
builder.Services.AddScoped<IPlayerCheckSheetService, PlayerCheckSheetService>();
builder.Services.AddScoped<IImageService, ImageService>();


builder.Services.AddHttpClient<SteamApiService>();

var app = builder.Build();


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

