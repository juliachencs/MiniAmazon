# Architecture Decision Record

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




## FAQs

OnAppLoad:
 - initialize the store
   - auth
   - media (large_screen | middle_screen | small_screen) - readonly




