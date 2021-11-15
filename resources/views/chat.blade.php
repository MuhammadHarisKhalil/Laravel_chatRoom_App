<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title></title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href="{{ asset( 'css/app.css')}}">
    <style>
        .list-group{
            overflow-y: scroll;
            height: 300px;
            border: 1px solid #eee;
            overflow: auto;
        }
    </style>
</head>
<body>
        <div class="container-fluid mt-5" id="app">
           <div class="row">
            <div class="col-12">
            <li class="list-group-item active" >Chat Group<span 
            class="badge badge-success badge-pill">@{{ totaluser }} </span></li>
            <div class="badge badge-pill badge-primary">@{{ typing }}</div>
                <ul class="list-group " v-chat-scroll>  
                 <message
                  v-for="item,index in chat.message" 
                  :key=item.index 
                  :user=chat.user[index]
                  :time=chat.time[index]
                  :color=chat.color[index]>
                   @{{ item }}
                 </message>
                </ul>
                <input type="text" class="form-control" 
                 placeholder="Type Text Here..." v-model='message' @keyup.enter='send'> 
            </div>
          </div>
      </div>
     <script src='{{asset("js/app.js")}}'></script>
</body>
</html>