// import { applyDecorators, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
// import { NoPermissionDto, NoTokenDto } from '../../modules/auth/dto/auth.dto';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { PermissionGuard } from '../guards/permission.guard';
//
// export const Permission = () => {
//   return applyDecorators(
//     UseGuards(JwtAuthGuard, PermissionGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized', type: NoTokenDto }),
//     ApiForbiddenResponse({
//       description: 'Fobbiden',
//       type: NoPermissionDto,
//     }),
//   );
// };
