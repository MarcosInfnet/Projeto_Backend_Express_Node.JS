import { prisma } from "../prisma";
import type { CreatePostDto } from "./dtos/create-post.dto";
import type { UpdatePostDto } from "./dtos/update-post.dto";
import type { CreatePostCommentDto } from "./dtos/create-post-comment.dto";





export class PostRepository{

  async listPosts({ limit, offset , order , search } : {
    limit: number , offset: number , order: "asc" | "desc"  , search:string
  }) {
    const posts = await prisma.posts.findMany({
      select: {
      id: true,
      content: true,
      created_at: true,
      user_id: true,
      users:{
        select:{
          first_name: true,
          last_name: true,
          avatar: true,     
  }}
      }, where: search ?{
        content: {
          contains: search,
        }
      }: undefined,
      orderBy: {
        created_at: order,
      },
      take: limit,
      skip:offset,
    });

    const count = await prisma.posts.count();
    return {
      posts,
      count,
    };
    }

  // const whereSearch = search ? `where content like '%${search}%'` : "";
  // const posts = db.prepare
  // (/* sql*/`select 
    // posts.id,
    // posts.content,
    // posts.created_at,
    // posts.user_id,
    // users.first_name as users.first_name,
    // users.last_name as users.last_name,
    // users.avatar as users.avatar
  // from posts join users on posts.user_id = users.id ${whereSearch}
  // order by posts.created_at ${order} limit ? offset ?
  // `).all( limit, offset);
  


  // @ts-ignore
  // const {posts_count : count} = db.prepare
  // (/* sql*/`select count(id) as posts_count from posts
  // `).get();
    // return {
      // posts,
      // count,
    
  // }
  // }
  
  
  async createPost(post : CreatePostDto) {
    
    const nextPost = await prisma.posts.create({
      data: {
          user_id: post.user_id,
          content: post.content,
      },
    });
    return nextPost;


    // const nextPost = db.prepare(/* sql*/ `
    // insert into posts (content, user_id) values (? , ?)returning*;`).get(post.content , post.user_id);
    // return nextPost; 
    }                               
  // A utilização do returning * é FE tenha a resposta do que foi salvo no DB. Neste caso de ter o retorno do db, é necessário trocar o ".run" pelo ".get"
  //O "nextPost que é o que está voltando pro FE indica quantas modificações e o ID utilizado"
  // Para que seja passado os valores do FE para o DB os parametro serão atrelados a "?"
  
  
  async readPost(id : number) {
    const post = await prisma.posts.findFirst({
      where:{id: id,
      },
    });  //Procurando a 1ª publicação no "findFist" da tabela de publicações "posts" onde o id é passado na chamada da função.
    return post;


    // const post = db.prepare(/* sql*/ `select * from posts where id=?`).get(id); 
    // return post;
    

  }
    // Lendo todos od posts salvos na tabela notepds
    // const post = await jsonService.readJson(`${postsPath}/${id}.json`);
    // return post;
  
  
  async updatePost(id : number, data : UpdatePostDto) {
  const post = await prisma.posts.update({
    where: {id: id,
    },
    data: {content: data.content,},
  }); 
  return post;

    // const post = db.prepare (/* sql*/ `update posts set content=? where id=? returning*;`).get(postData.content, id);
    // return post;

  }
  
  async deletePost(id : number) {
  const post = await prisma.posts.delete({
    where:{id: id,
    },
  }); 
  return post;
  }
    // const post = db.prepare(/* sql*/`delete from posts where id=? returning*;`).get(id);
    // return post;
  
  
  
  async listPostComments(postId : number) {
    const comments = await prisma.comments.findMany({
      select:{
        id:true,
        message:true,
        created_at:true,
        user_id:true,
      users:{
        select:{
        first_name:true,
        last_name:true,
        avatar:true,
      }
      }
      }, where: {post_id:postId,}, orderBy:{created_at:'desc'}

    })
    return comments;



  //const comments= db.prepare
  //(/* sql*/`select 
  //comments.id,
  //comments.message,
  //comments.created_at,
  //comments.user_id,
  //users.first_name as users.first_name,
  //users.last_name as users.last_name,
  //users.avatar as users.avatar
  //from comments join users on comments.user_id = users.id 
  //where post_id=?
  //order by comments.created_at desc
  //`).all(postId);
  //return comments;
  }
  
  async createPostComment(postId : number, data :CreatePostCommentDto) {
    
    const comment = await prisma.comments.create({
      data:{
        message:data.message,
        user_id:data.user_id,
        post_id:postId,
      }
    })
    return comment;

  //await createPostCommentSchema.parseAsync(data);
  //const comment = db.prepare (/* sql*/`insert into comments (message, post_id , user_id) values (? , ? , ?) returning*`).get(data.message , postId , data.user_id );
  //return comment;
  }
  

}




