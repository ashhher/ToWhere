# 1. 拉取node镜像打包React项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build

# 2. 创建并运行Nginx服务器 并将打包好的文件复制粘贴到服务器文件夹中
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 构建镜像
# docker build -t react-tourism-ecommerce .
#                  (项目名)
# 输出
# docker save -o xh.tar react-tourism-ecommerce:latest
# 
# 载入
# docker load -i xh.tar
# 
# 部署项目
# docker run -d -p 39651:80 react-tourism-ecommerce