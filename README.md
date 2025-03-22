### node -v => 22.10.0
### npm -v => 10.9.0

### npm install 切换淘宝镜像 
```
npm config set registry https://registry.npmmirror.com
```

### npm run dev

### npm run build
1. 打开项目终端
```
scp -r dist/* root@120.55.77.98:/var/www/your_project
```

2. 输入root密码
3. 终端输入ssh root@120.55.77.98
4. sudo systemctl restart nginx重启服务器 