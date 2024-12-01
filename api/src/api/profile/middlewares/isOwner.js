'use strict';

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  
  return async (ctx, next) => {
    try {
      const user = ctx.state.user; // รับข้อมูลผู้ใช้จาก context
      var entryId = await ctx.params.id ? ctx.params.id : undefined; // รับ ID ของโปรไฟล์จาก parameters
      let entry = {};
      
      // ตรวจสอบว่าผู้ใช้ลงชื่อเข้าใช้หรือไม่
      if (!user)
        return ctx.unauthorized("User authentication is required.");
      
      // ตรวจสอบว่ามี ID หรือไม่
      if (!entryId) {
        return ctx.badRequest("Profild ID is required.")
      }

      // ตรวจสอบว่า ID เป็นตัวเลขหรือไม่
      if(!(!isNaN(entryId) && !isNaN(parseFloat(entryId))))
        return ctx.badRequest("ID must be digit only")
      
      entry = await strapi.entityService.findOne(
        'api::profile.profile',
        entryId,
        { populate: "*" }
      );

      // ตรวจสอบว่าพบโปรไฟล์หรือไม่
      if (!entry) 
        return ctx.notFound("Profile not found.");
      
      // ตรวจสอบว่า ID ของผู้ใช้ตรงกับเจ้าของโปรไฟล์หรือไม่
      if (user.id !== entry.user.id) {
        return ctx.unauthorized("This action is unauthorized.");
      } else {
        return next();
      }

    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError("An error occurred.");
    }
  };
};
