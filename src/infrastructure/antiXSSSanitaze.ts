//  const antiXSSSanitize = (html: string): string => {
//   const doc = new DOMParser().parseFromString(html, "text/html");

//   doc.querySelectorAll("script, iframe, object, embed, form").forEach(el => el.remove());

//   doc.querySelectorAll("*").forEach(el => {
//     [...el.attributes].forEach(attr => {
//       if (attr.name.startsWith("on") || attr.value.startsWith("javascript:")) {
//         el.removeAttribute(attr.name);
//       }
//     });
//   });

//   return doc.body.innerHTML;
// };
// export default antiXSSSanitize;
