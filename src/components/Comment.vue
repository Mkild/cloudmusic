<template>
  <div class="comment" v-if="comment">
    <div class="avatar">
      <img v-lazy="$utils.genImgUrl(comment.user.avatarUrl, 80)" />
    </div>
    <div :class="{ border }" class="content">
      <p class="comment-text">
        <span class="username">{{ comment.user.nickname }}:</span>
        <span class="text">{{ comment.content }}</span>
      </p>
      <div class="replied" v-if="comment.beReplied.length">
        <p class="comment-text">
          <span class="username">{{ comment.beReplied[0].user.nickname }}:</span>
          <span class="text">{{ comment.beReplied[0].content }}</span>
        </p>
      </div>
      <div class="bottom">
        <span class="date">{{ $utils.formatDate(comment.time) }}</span>
        <div class="actions">
          <Icon :size="12" type="good" />
          {{ comment.likedCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    props: ['comment', 'border'],
  }
</script>

<style lang="scss" scoped>
  .comment {
    display: flex;
    padding-top: 20px;

    .avatar {
      @include img-wrap(40px);
      margin-right: 12px;
      cursor: pointer;

      img {
        border-radius: 50%;
      }
    }

    .content {
      padding-bottom: 20px;
      width: 100%;
      font-size: $font-size-sm;

      &.border {
        border-bottom: 1px solid $border-color;
      }

      .replied {
        padding: 8px;
        margin-top: 8px;
        background: #f0f0f0;
        border-radius: 4px;
      }

      .comment-text {
        .username {
          display: inline-block;
          margin-right: 4px;
          color: $blue;
          cursor: pointer;

          &:hover {
            color: $blue-hover;
          }
        }

        .text {
          line-height: 1.5;
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        .date {
          color: $font-color-gray-shallow;
        }

        .actions {
          color: $font-color-grey-shallow;
        }
      }
    }
  }
</style>
