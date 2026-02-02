# Architecture Decision Record

### Router Desgin


**Auth**
| 功能     | URL路径       | 组件名          | 备注                                |
| -------- | ------------- | --------------- | ----------------------------------- |
| 登录     | /auth/login   | Login           | 提供账号/密码及登录                 |
| 注册     | /auth/signup  | Signup          | 提供账号/密码及注册                 |
| 重置密码 | /auth/recover | RecoverPassword | 用于未登录时找回密码（邮件/验证码） |


**Products**
| 功能 | URL路径                             | 组件名                                               | 备注 |
| ---- | ---------------------------------- |---------------------------------------------------- | ---- |
| 列表 | /products                          | Products      | 显示product pages的第一页（默认排序方式和page size） |
| 列表 | /products?page={}&sortby={}&key={} | Products      | 显示one page of products page                                     |
| 详情 | /products/item/:id                 | Product       | 通过增加 item 层级避开冲突                           |
| 新增 | /products/create                   | CreateProduct |
| 编辑 | /products/update/:id               | UpdateProduct |

### Email validation

source: https://colinhacks.com/essays/reasonable-email-regex

```javascript
/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i

^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][A-Za-z0-9\-]*\.)+[a-zA-Z]{2,}
```

Explanation:

The username (AKA "local part")


The domain
- must consist of at least 2 dot-separated segments consisting of letters, numbers, and hyphens
- can't have two dots in a row
- must end with a "TLD" that's 2+ letters

### Password validation

source: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-password-using-regular-expressions/

```Javascript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
```

Regula Expression Breakdown:

- ^(?=.*[a-z]): Ensures at least one lowercase letter.
- (?=.*[A-Z]): Ensures at least one uppercase letter.
- (?=.*\d): Ensures at least one digit.
- (?=.*[@$!%*?&]): Ensures at least one special character.
- [A-Za-z\d@$!%*?&]{8,}$: Ensures the password is at least 8 characters long.
  abc@ABC!123

const email_title = 'Invalid email address. An valid email address with pattern username@domain.\r\n' +
 ' The username part:\n' +
 ' - consists of letters, numbers, and these special characters: _+-.\r\n' +
 ' - without two dots in a row\n' +
 ' - can\'t start or end with a dot\n' +
 ' The domain part:\n' +
 ' - consists of letters, numbers, hyphens, and dots' +
 ' - can\'t start or end with a hyphen or dot\n' +
 ' - contains at least one dot\n' +
 ' - the last part (after the last dot) must be at least two letters long.\n';
 console.log(email_title);

const password_title = `A valid password consists of at least onenumber, letter and special character. It must contain 
- at least one number, 
- at least one uppercase letter,
 - at least one lowercase letter
 - at least one special character(+@#$!%*?&) 
- at least 8 characters
 - at most 24 characters.`;
  
## Pagniation 

### Reponsive page size

- For the mobile  (ss:small screen)  : 16|24
- For the tablet  (ms: middle screen): 8 |12
- For the desktop (ls: large screen) : 4 | 6

用户体验 (UX)：自动调整 page size 确保了页面不会因为项目太少而留下大片空白，或者因为项目太多而在移动端加载缓慢。


### The routing design for pages

**Options**

- 方案1. /products?offset={}&limit={}&sortby={} 
- 方案2：/products?page={}&size={}&sortby={}
- **方案3(our choice)：/products?page={}&sortby={}&key={}**


**对比分析 (Pros & Cons)** 
- ?page is better than ?offset.
   
  Reason: While offset is more "database-native," page is more "user-friendly" and standard for modern Web SEO.

- page-key is bettern than page-size


  - When users share the url cross device, we are trying to provide a seamless experience across devices. 
  
    We are trying to avoid the "Jump" issue: if a user is on Page 3 on Desktop (items 49-72) and rotates their phone to Mobile (where Page 3 is items 13-18), the content will change drastically.

    If the user is looking at the "25th item" on the PC and send the link to a phone, the phone will open the page that contains that "25th item," even if it's now Page 5 instead of Page 2 while the key is auto-corrected.
    

  - When users manually input the url, we are trying to prevent users from manually tampering with internal layout logic. Users are less likely to try and "hack" the URL (e.g., setting size=9999 to crash your app) if they see an encoded key.
  
**Decision** 

We choose the (Page + Sort + Encoded Key) strategy to handle responsive pagination. This approach utilizes Opaque State Encoding to manage environment-specific configurations.

By replacing a human-readable size field with an encoded key (e.g., v2-ms-6, representing version 2 logic, medium screen size, and a limit of 6), we prevent users from manually tampering with internal layout logic. This strategy obscures technical specifications—such as grid limits—while keeping the URL user-friendly.


The system provides a seamless experience across varying environment configurations (e.g., legacy bookmarks or cross-device link sharing) by automatically decoding the key on load. If the key does not match the current device, the application auto-corrects the page parameter to ensure the user’s scroll position (anchor index) remains consistent.



## Product Dataset

### make our dataset
``` 
Lighting
Plants & planters
Home electronics
Storage & organization
Beds & mattresses
Smart home
Tables & chairs
Home decor & accessories
Kitchen, appliances & supplies
Sofas & armchairs
```



### statistics of the data
```
Lighting : 510
Plants & planters : 375
Home electronics : 108
Storage & organization : 4124
Beds & mattresses : 1154
Smart home : 111
Tables & chairs : 941
Home decor & accessories : 693
Kitchen, appliances & supplies : 12226
Sofas & armchairs : 2052
Bathroom: furniture, supplies & more : 1012
Flooring, rugs & mats : 240
Kitchenware & tableware : 1028
Baby & kids : 1017
Outdoor : 711
Desk & desk chairs : 855
Home textiles : 1877
Home improvement : 139
Laundry & cleaning : 135
Storage containers, organizers & baskets : 490
IKEA Food & Swedish restaurant : 93
Pet accessories : 27
```

```bibtex
@misc{ikea_us_products_2025,
  title = {IKEA US Product Dataset (July 2025)},
  author = {Jeffrey Zhou},
  year = {2025},
  url = {https://huggingface.co/datasets/jeffreyszhou/ikea-us-products-2025}
}
```


## FAQs




