class Singer {
  constructor ({name, id}) {
    this.name = name
    this.id = id,
    this.avatar = getAvatarUrl(id)
  }
}

function getAvatarUrl (id) {
  return `http://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
}

export default Singer
