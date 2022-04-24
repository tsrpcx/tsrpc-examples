# TSRPC Server

- HallServer：无状态 HTTP API 服务
- MatchServer：房间管理服务（开房间、随机匹配），HTTP
- RoomServer：房间服务（运行实际房间逻辑），WebSocket

RoomServer 启动后去 MatchServer 注册服务，MatchServer 和 RoomServer 保持长连接 RPC。

## 介绍

## 启动

```shell
# 启动 HallServer
npm run dev:hall

# 启动 MatchServer
npm run dev:match

# 启动 RoomServer
npm run dev:room

# 再启动一个 RoomServer （测试分布式）
npm run dev:room2
```

## 构建

```shell
npm run build
```