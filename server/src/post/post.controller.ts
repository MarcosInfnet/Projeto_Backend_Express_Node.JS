// CONTROLLER: Resp. por controlar (validar/encaminhar) os dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)
// Este CONTROLLER é resp. por interfacear o envio dos dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)

import {JsonController , Get , Post , Delete , Put , QueryParam , Param , Body , HttpCode, Authorized , CurrentUser} from "routing-controllers";
import { PostRepository } from "./post.repository";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import type { User } from "../user/user.types";
import { PostService } from "./post.service";




@JsonController("/posts")

export class PostController{

  constructor(){
    this.postRepository = new PostRepository();
    this.postService = new PostService();
    }
    postRepository : PostRepository;
    postService : PostService;

  @Get()
  async getAll(@QueryParam('limit') limit : number = 30,       //Definição do valor de limit. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (30)
               @QueryParam('offset') offset : number = 0,      //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0) 
               @QueryParam('order') order : string = 'desc',   //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0)
               @QueryParam('search') search : string           //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0)
               ){

    
    const posts = await this.postRepository.listPosts({ limit, offset , order : order as "asc" | "desc" , search });
    return posts;

  }



@Get("/:id")
async getById(@Param("id") postId: number){

const post = await this.postRepository.readPost(postId);
return post;
}


@Authorized()
@HttpCode(201)
@Post()
async createPost(@Body() body : CreatePostDto , @CurrentUser() user : User){
  body.user_id = user.id;
  const post = await this.postRepository.createPost(body);
  return post;
}

@Authorized()
@Delete("/:id")
async deleteById(@Param("id") postId: number , @CurrentUser() user : User){
  const post = await this.postService.deletePost(postId , user.id);
  return post;
}


@Authorized()
@Put("/:id")
async updateById(@Param("id") postId: number , @Body() postData : UpdatePostDto , @CurrentUser() user : User){
  postData.user_id = user.id;
  const post = await this.postService.updatePost(postId, postData);
  return post;
}

@Get("/:id/comments")
async listPostComments(@Param('id') postId : number){
  const comments = await this.postRepository.listPostComments(postId);
  return comments;
}


@Authorized()
@HttpCode(201)
@Post("/:id/comments")
async createPostComment(@Param ('id') postId : number , @Body() commentData : CreatePostCommentDto , @CurrentUser() user : User){
  commentData.user_id = user.id;
  const comment =await this.postRepository.createPostComment(postId, commentData);
  return comment;
}
}





