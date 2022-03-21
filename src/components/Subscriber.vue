<template>
  <div class="subscriber" v-if="subscriber">
    <div class="subscriber-wrap">
      <div class="avatar">
        <img v-lazy="$utils.genImgUrl(subscriber.avatarUrl, 200)" />
      </div>
      <div class="subscriber-text">
        <p class="username">
          {{ subscriber.nickname }}
          <Icon v-if="subscriber.gender === 1" :size="15" type="male" color="cyan" />
          <Icon v-if="subscriber.gender === 2" :size="15" type="female" color="pink" />
        </p>
        <p class="signature" v-if="subscriber.signature">{{ subscriber.signature }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Subscriber',
    props: ['subscriber'],
  }
</script>

<style lang="scss" scoped>
  .subscriber {
    display: inline-block !important;
    width: 320px;
    margin-left: 20px;
    margin-right: 60px;
  }

  .subscriber-wrap {
    display: flex;
    align-items: center;
    padding-top: 20px;
    overflow: hidden;

    .avatar {
      @include img-wrap(100px);
      margin-right: 12px;
      cursor: pointer;

      img {
        border-radius: 50%;
      }
    }

    .subscriber-text {
      display: inline-block;
      overflow: hidden;

      .username {
        font-size: 14px;
        cursor: pointer;
        @include text-ellipsis;

        &:hover {
          color: #000000;
        }
      }

      .signature {
        font-size: 12px;
        margin-top: 15px;
        @include text-ellipsis;
      }
    }
  }
</style>
