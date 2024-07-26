#使用node作为基础镜像
FROM node:18-alpine AS build
#设置工作目录
WORKDIR /app-client
# 拷贝 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
# 安装项目依赖
RUN npm install
# 拷贝所有文件到工作目录
COPY . .
# 构建生产环境代码
RUN npm run build
# 暴露容器的 4000 端口
EXPOSE 4000
# 运行 Vue 应用
CMD ["npm", "start"]