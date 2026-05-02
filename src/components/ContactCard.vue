<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
  computed: {
    hobbyLabels() {
      const map = {
        reading: "Đọc sách",
        music: "Nghe nhạc",
        running: "Chạy bộ",
        badminton: "Cầu lông",
        football: "Đá bóng",
      };
      if (!this.contact.hobbies || this.contact.hobbies.length === 0) {
        return ["Không có"];
      }
      return this.contact.hobbies.map((h) => map[h] || h);
    },
  },
};
</script>

<template>
  <div>
    <div class="p-1"><strong>Tên:</strong> {{ contact.name }}</div>
    <div class="p-1"><strong>E-mail:</strong> {{ contact.email }}</div>
    <div class="p-1"><strong>Địa chỉ:</strong> {{ contact.address }}</div>
    <div class="p-1"><strong>Điện thoại:</strong> {{ contact.phone }}</div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>

    <div class="p-1">
      <strong>Sở thích:</strong>
      <span
        v-for="(hobby, index) in hobbyLabels"
        :key="index"
        class="badge badge-info mr-1 mt-0"
      >
        {{ hobby }}
      </span>
    </div>

  </div>
</template>