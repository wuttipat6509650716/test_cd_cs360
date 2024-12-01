const request = require('supertest');
const { describe, beforeAll, afterAll, it, expect } = require("@jest/globals");
const {grantPrivilege,grantPrivileges,jwt} = require('../../helpers/strapi.js')
const utils_user = require('@strapi/plugin-users-permissions/server/utils')
const _ = require("lodash");
const user = require('@strapi/plugin-users-permissions/server/services/user.js');

describe('Profile Integration Test',()=>{
    var user1 ,user2
    var profile1 ,profile2
    var user1_jwt ,user2_jwt
    beforeAll(async () => {
        //Add permission for access Profile Api (Authen)
        try {
            permissions = [
                'api::profile.controllers.profile.create',
                'api::profile.controllers.profile.find',
                'api::profile.controllers.profile.findOne',
                'api::profile.controllers.profile.update',
                'api::profile.controllers.profile.delete',
            ]
            // await grantPrivileges(2,permissions);
            await grantPrivileges(1,permissions);

            user1 = await utils_user.getService('user').add({
                username:"save",
                email:"save.abc@gmail.com",
                password:"123456",
                job:'student',
                role:1
            })

            user2 = await utils_user.getService('user').add({
                username:"bell",
                email:"bell.abc@gmail.com",
                password:"123456",
                job:'student',
                role:1
            })

            // //Add Data in Database
            profile1 = await strapi.entityService.create("api::profile.profile",{
                data:{
                    firstname: "napat",
                    lastname: "thai",
                    nickname: "save",
                    age: 21,
                    Gender: "male",
                    phone: "0999999999",
                    birthday: "2024-10-09",
                    address: "Jpark",
                    publishedAt: new Date(),
                    user:user1.id
                }
            })

            // //Add Data in Database
            profile2 = await strapi.entityService.create("api::profile.profile",{
                data:{
                    firstname: "bbb",
                    lastname: "ccc",
                    nickname: "bell",
                    age: 100,
                    Gender: "male",
                    phone: "0999999999",
                    birthday: "2024-10-09",
                    address: "Jpark",
                    publishedAt: new Date(),
                    user:user2.id

                }
            })

            await utils_user.getService('user').edit(user1.id,{
                profile:profile1.id
            })

            await utils_user.getService('user').edit(user2.id,{
                profile:profile2.id
            })

            user1_jwt = jwt(user1.id);
            user2_jwt = jwt(user2.id);


        } catch (error) {
            console.log(error.details.errors);
            
        }

    });

    //TC1
    it("should create a new user profile",async ()=>{
        const res = await request(strapi.server.httpServer)
            .post('/api/profiles')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user1_jwt}`)
            .send({
                data:{
                    firstname: "test",
                    lastname: "test",
                    age: 20,
                    nickname: "testtest",
                    gender: "other",
                    phone: "0874878784",
                    birthday: "2024-10-09",
                    address: "abcdefg",
                }
            })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    });

    //TC2
    it("should retrieve user profile",async ()=>{
        const profileId = 1;
        const res = await request(strapi.server.httpServer)
            .get('/api/profiles/'+profileId)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user1_jwt}`)
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('id',1)

    });

    //TC3
    it("should update user profile if Owner",async ()=>{
        
        const res = await request(strapi.server.httpServer)
            .put('/api/profiles/'+profile1.id)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user1_jwt}`)
            .send({
                data:{
                    age:1000
                }
            })
        expect(res.status).toBe(200);
        expect(res.body.data.attributes).toHaveProperty('age',1000);
    });

    //TC4
    it("should not update user profile if not Owner",async ()=>{
        const res = await request(strapi.server.httpServer)
            .put('/api/profiles/'+profile1.id)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user2_jwt}`)
            .send({
                data:{
                    age:1000
                }
            })
        
        expect(res.status).toBe(401);
        expect(res.body.error.message).toBe('This action is unauthorized.');
    });
     //TC6
     it("should delete user profile if Owner",async ()=>{
        const res = await request(strapi.server.httpServer)
            .delete('/api/profiles/'+profile2.id)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user1_jwt}`)
        
        expect(res.status).toBe(401);
        expect(res.body.error.message).toBe('This action is unauthorized.');
    });

    //TC5
    it("should delete user profile if Owner",async ()=>{
        const res = await request(strapi.server.httpServer)
            .delete('/api/profiles/'+profile1.id)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${user1_jwt}`)
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');

    });

})