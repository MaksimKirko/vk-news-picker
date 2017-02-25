# vk-news-picker

  VK news picker
  
  VK news picker is a web application, which is designed for creating a news feed from VKontakte social network based on user’s preferences. These preferences are represented as “hashtags”, which are united in lists. Each user has to provide valid VK credentials to gain access to his VK feed.
  
  This application will be divided into a server and a client parts. The client part is responsible for user interaction and displaying filtered news. Server part calls VK API methods to get the news feed from VK server in correspondence with user preferences.

  The method which is used for searching news list is <b>newsfeed.search</b> <a href="https://vk.com/dev/newsfeed.search">Click for details</a>
  
  User authorization is represented by VK Auth Widget(<a href="https://vk.com/dev/widget_auth">Click for details</a>) too. Users cridentials will not be saved into our database.  User connects with his preferences through his VK page id.
