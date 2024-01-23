
# Event-Driven-Multiple-Authentication

▪️  nodejs ▪️express ▪️  typescript ▪️  javascript ▪️ react ▪️  redux-toolkit ▪️  docker ▪️  docker-compose ▪️  redis ▪️  ngnix ▪️  rabbitmq ▪️  mongoDb ▪️  passport.Js ▪️  pm2 ▪️  nodemailer

> Uygulama genelinde kullanılan error sınıfları,middleware, redis ve rabbitmq configurasyonları vb.. npmjs de brk-gcl-libary tutuluyor. 

![Resim Açıklaması](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/271650d6-3a36-4968-bc83-65f938be42ab)

### Bilgilendirme !
**Uygulama geliştirme aşamasında olduğu için eksik, hatalı ve düzenlenmesi gereken kısımlar var. Lütfen en alttaki geliştirmeler ve eksiklikler kısmını kontrol ediniz.**

*! subdomain yapılandırmalarını localhost da kullanabilmek için host (/etc/host) yapılandırmaları gerekiyor. Localhost için ngnix.conf düzenlenmeli (port forwarding yapılarak kullanılabilir).*
>(Uygulamayı incelerken dil farklarına şaşırmayın. Türkçe ve Ingilizce'yi karışık kullanmışım. Biraz komik oldu ama en kısa zamanda gerekli düzenlemeleri yapıcam)
>



## Frontend 

![Login](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/b609f320-6252-44db-8c36-c601906ec800)

![Register](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/f1a6a09f-ee06-4bbe-b469-de9ff8eec204)
![profile](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/1576e035-01a8-480e-964d-b4d9637d4fbc)
![Forgot-Password](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/72013650-5812-46ce-9eff-57c0eb51cda1)

![email](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/f2d3e8d0-e23f-41b5-b8de-4fc06e69932a)

## Routes

***Authentication Service***

|auth      |     |                  |													|
|------|-----|------------------|---------------------------------------------------|
|GET   |/auth|/google			| google ile giriş yapma							|
|GET   |/auth|/facebook			| facebook ile giriş yapma							|
|POST  |/auth|/local/login		| email ve password ile giriş yapma					|
|POST  |/auth|/local/register	| email ve password ile kayıt olma					|
|GET   |/auth|/get-access-token	| user routune istek yapabilmek için access_token	|
|GET   |/auth|/reflesh-token	| süresi dolmus access_token yenileme				|
|GET   |/auth|/loqout			| cıkış yapma										|
|GET   |/auth|/forgot-password	| sifre yenileme email i alma						|
|POST  |/auth|/change-password	| email ile şifre yenileme							|

|user  |     |                         |											|
|------|-----|-------------------------|--------------------------------------------|
|GET   |/user|/profile				   | kullanıcı bilgileri						|
|POST  |/user|/update				   | kullanıcı bilgileri güncelleme				|
|POST  |/user|/delete				   | kullanıcıyı silme							|
|GET   |/user|/get/:userId			   | bir kullanıcının bilgilerini alma			|
|GET   |/user|/get/:all			 	   | bütün kullanıcıların bilgilerini alma		|
|GET   |/user|/email/send-verify-mail  | email hesabı onaylama maili gönderme		|
|GET   |/user|/email/verify-email-token| mail ile hesap onaylama 					|

***Notification Service***
|user  |     |                   |					|
|------|-----|-------------------|------------------|
|POST  |/    |/send-mail/:email  | email gönderme	|

> (Notification service rabbitmq ile  actionları dinliyor)


## Kullanıcı ve Oturum bilgilerinin saklanması
- access ve reflesh tokenı giriş işleminden sonra kullanıcıya veriyorum ve cookie de saklıyorum. Diğer backend servislerinin erişimi için bir kopyasını redis de tutuyorum. 

![session](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/3aadaa88-998a-4c74-be48-0baf4255bd6a)
access_token (expires:30m) ve reflesh_token (expires:60m) 
![redis](https://github.com/brkgcl/nodejs-event-driven/assets/54892419/f9cebc8d-1ed8-4121-b365-e07b5a9b2287)
