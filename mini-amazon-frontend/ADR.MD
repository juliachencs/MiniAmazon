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

OnAppLoad:
 - initialize the store
   - auth
   - media (large_screen | middle_screen | small_screen) - readonly




