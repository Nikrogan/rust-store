FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

#EXPOSE 80
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["RustStore/RustStore.csproj", "RustStore/"]
COPY ["DAL/DAL.csproj", "DAL/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["PaymentAdapter/PaymentAdapter.csproj", "PaymentAdapter/"]
COPY ["Service/Service.csproj", "Service/"]
RUN dotnet restore "RustStore/RustStore.csproj"
COPY . .
WORKDIR "/src/RustStore"
RUN dotnet build "RustStore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RustStore.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RustStore.dll"]