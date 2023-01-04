// import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, Logger } from "@nestjs/common";
// import { toLower, replace } from 'lodash';
// import { NO_PERMISSION, SERVICE_API_NOT_FOUND } from '../../messages/auth.message';
// // import { PermissionService } from "../../modules/permission/permission.service";
// import { decrypt3DES } from "../../util/crypto";
// import { JwtService } from "@nestjs/jwt";
// import { PayloadJwt } from "../interfaces/payload-jwt.interface";
//
// @Injectable()
// export class PermissionGuard implements CanActivate {
//   // constructor(@Inject(PermissionService) private permissionService: PermissionService,
//               private readonly  jwtService : JwtService) {}
//
//
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const fPermission = await this.permissionService.findOneUP(request.user.email)
//     const nPermission = Object.values(fPermission.permissionGroup)
//     const bearer = request.headers.authorization
//     const token = bearer.slice(7,)
//     const data = await this.jwtService.decode(token) as PayloadJwt
//     const resolve = decrypt3DES(data.data,data.uId)
//
//     const permissionCodes: string = nPermission[3]
//
//     const display: string= nPermission[4]
//
//     const { method, path, params, query } = request;
//     const paramLength = Object.keys(params).length;
//     const queryLength = Object.keys(query).length;
//
//     const pathRemoveQuery = queryLength ? path.split('?')[0] : path;
//     const splitPath = pathRemoveQuery.split('/');
//
//     const apiPath = paramLength ? splitPath.slice(0, splitPath.length - 2).join('_') : path.split('/').join('_');
//     const apiMethod = toLower(method);
//     const apiName = apiMethod + apiPath;
//
//     if (nPermission[1] === 'ADM000') {
//       console.log('🥇 ~ payload','bạn là admin hệ thống');
//
//     } else if (nPermission[1] === 'CD0111' && splitPath[1] =='miss' || splitPath[1] =='contest') {
//       console.log('🥈 ~ payload','bạn là nhân viên content. Bạn có quyền CRUD miss & contest ');
//
//     } else if(nPermission[1] === 'CD0112' && splitPath[1] =='contest'){
//       console.log('🥉 ~ payload','bạn là nhân viên marketing chỉ có quyền CRUD contest');
//
//     }else{
//       console.log('🌟 ~ payload','bạn không có quyền thao tác hãy liên hệ với admin');
//
//       throw new ForbiddenException(NO_PERMISSION)
//
//     }
//
//     return true;
//   }
// }
