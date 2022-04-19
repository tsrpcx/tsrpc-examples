export interface BaseRequest {
    /** 登录态 */
    sso?: string
}

export interface BaseResponse {

}

export interface BaseConf {
    /**
     * 此接口是否允许为登录用户调用
     * @defaultValue false
     */
    allowGuest?: boolean
}

export interface BaseMessage {

}