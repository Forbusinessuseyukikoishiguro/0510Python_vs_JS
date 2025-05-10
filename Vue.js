# Vue.js & JavaScript チートシート - VSCode開発者向け

## Vue.js 基本構文

### コンポーネント定義（Options API）
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">クリック</button>
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  data() {
    return {
      title: 'Hello Vue'
    }
  },
  methods: {
    handleClick() {
      console.log('clicked')
    }
  }
}
</script>

<style scoped>
/* スコープ付きスタイル */
</style>
```

### コンポーネント定義（Composition API）
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">クリック</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Hello Vue')
const handleClick = () => {
  console.log('clicked')
}
</script>
```

### データバインディング
```vue
<template>
  <!-- テキスト補間 -->
  <p>{{ message }}</p>
  
  <!-- 属性バインディング -->
  <img :src="imageUrl" :alt="altText">
  
  <!-- クラスバインディング -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  
  <!-- スタイルバインディング -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
  
  <!-- 双方向バインディング -->
  <input v-model="message">
</template>
```

### 条件付きレンダリング
```vue
<template>
  <div v-if="isVisible">表示</div>
  <div v-else-if="isLoading">読み込み中</div>
  <div v-else>非表示</div>
  
  <!-- v-show（DOMに残る） -->
  <div v-show="showContent">コンテンツ</div>
</template>
```

### リストレンダリング
```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- インデックス付き -->
  <div v-for="(item, index) in items" :key="index">
    {{ index }}: {{ item }}
  </div>
</template>
```

### イベントハンドリング
```vue
<template>
  <!-- 基本的なイベント -->
  <button @click="onClick">クリック</button>
  
  <!-- 引数付き -->
  <button @click="onSubmit('data')">送信</button>
  
  <!-- イベント修飾子 -->
  <form @submit.prevent="onSubmit"></form>
  <div @click.stop="onClick"></div>
  <input @keyup.enter="onEnter">
  <button @click.once="onOnceClick">1回だけ</button>
</template>
```

### コンポーネント間通信
```vue
<!-- 親コンポーネント -->
<template>
  <ChildComponent 
    :message="parentMessage"
    @child-event="handleChildEvent"
  />
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

const handleChildEvent = (data) => {
  console.log(data)
}
</script>

<!-- 子コンポーネント -->
<script setup>
const props = defineProps({
  message: String
})

const emit = defineEmits(['child-event'])

const sendData = () => {
  emit('child-event', 'データ')
}
</script>
```

### ライフサイクルフック
```javascript
// Options API
export default {
  created() {
    // コンポーネント作成時
  },
  mounted() {
    // DOMにマウント後
  },
  updated() {
    // データ更新後
  },
  unmounted() {
    // コンポーネント破棄時
  }
}

// Composition API
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  // DOMにマウント後
})

onUpdated(() => {
  // データ更新後
})

onUnmounted(() => {
  // コンポーネント破棄時
})
```

### 算出プロパティ・ウォッチャー
```javascript
// Options API
export default {
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    message(newVal, oldVal) {
      console.log('messageが変更:', newVal)
    }
  }
}

// Composition API
import { computed, watch } from 'vue'

const firstName = ref('太郎')
const lastName = ref('山田')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

watch(message, (newVal, oldVal) => {
  console.log('messageが変更:', newVal)
})
```

## JavaScript 基本構文

### 変数宣言
```javascript
// const（再代入不可）
const name = '田中'
const numbers = [1, 2, 3]

// let（再代入可能）
let count = 0
count = 1

// var（使用非推奨）
var oldStyle = 'avoid'
```

### 関数
```javascript
// 関数宣言
function greet(name) {
  return `Hello ${name}`
}

// 関数式
const greet = function(name) {
  return `Hello ${name}`
}

// アロー関数
const greet = (name) => {
  return `Hello ${name}`
}

// 省略形
const greet = name => `Hello ${name}`

// デフォルト引数
const greet = (name = 'Guest') => `Hello ${name}`
```

### オブジェクト
```javascript
// オブジェクト定義
const user = {
  name: '田中',
  age: 30,
  greet() {
    return `Hello ${this.name}`
  }
}

// 分割代入
const { name, age } = user

// スプレッド演算子
const newUser = { ...user, email: 'tanaka@example.com' }

// 動的プロパティ
const key = 'name'
const obj = {
  [key]: '値'
}
```

### 配列
```javascript
// 配列定義
const numbers = [1, 2, 3, 4, 5]

// map（変換）
const doubled = numbers.map(n => n * 2)

// filter（絞り込み）
const evens = numbers.filter(n => n % 2 === 0)

// reduce（集約）
const sum = numbers.reduce((acc, n) => acc + n, 0)

// find（検索）
const found = numbers.find(n => n > 3)

// forEach（反復）
numbers.forEach(n => console.log(n))

// 分割代入
const [first, second, ...rest] = numbers

// スプレッド演算子
const combined = [...numbers, 6, 7, 8]
```

### 非同期処理
```javascript
// Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('データ')
    }, 1000)
  })
}

// async/await
const getData = async () => {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// fetch API
const fetchUser = async () => {
  const response = await fetch('/api/user')
  const data = await response.json()
  return data
}
```

### クラス
```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  
  greet() {
    return `Hello, I'm ${this.name}`
  }
  
  static compare(person1, person2) {
    return person1.age - person2.age
  }
}

// 継承
class Student extends Person {
  constructor(name, age, school) {
    super(name, age)
    this.school = school
  }
  
  study() {
    return `${this.name} is studying at ${this.school}`
  }
}
```

### モジュール
```javascript
// エクスポート
export const name = '田中'
export function greet() {
  return 'Hello'
}

export default class User {
  // クラス定義
}

// インポート
import User, { name, greet } from './user'
import * as userModule from './user'
import { name as userName } from './user'
```

## VSCode ショートカット

### 編集
- `Ctrl+D` - 次の同じ文字列を選択
- `Ctrl+Shift+L` - 全ての同じ文字列を選択
- `Alt+Click` - 複数カーソル
- `Ctrl+Shift+K` - 行削除
- `Alt+↑/↓` - 行移動
- `Ctrl+/` - コメントトグル
- `Ctrl+Shift+A` - ブロックコメント

### ナビゲーション
- `Ctrl+P` - ファイル検索
- `Ctrl+Shift+P` - コマンドパレット
- `Ctrl+G` - 行番号ジャンプ
- `Ctrl+F` - 検索
- `Ctrl+H` - 置換
- `F12` - 定義へ移動
- `Alt+F12` - 定義をプレビュー

### デバッグ
- `F5` - デバッグ開始
- `F10` - ステップオーバー
- `F11` - ステップイン
- `Shift+F11` - ステップアウト
- `F9` - ブレークポイント設定

## Vue.js実用例

### コンポーネント例
```vue
<template>
  <div class="user-list">
    <input v-model="searchQuery" placeholder="検索...">
    
    <div v-if="loading">読み込み中...</div>
    <div v-else-if="error">エラー: {{ error }}</div>
    <div v-else>
      <div v-for="user in filteredUsers" :key="user.id" class="user-item">
        <img :src="user.avatar" :alt="user.name">
        <div>
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </div>
        <button @click="deleteUser(user.id)">削除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const users = ref([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref(null)

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return users.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('/api/users')
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  try {
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    users.value = users.value.filter(user => user.id !== id)
  } catch (err) {
    console.error('削除エラー:', err)
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.user-list {
  max-width: 600px;
  margin: 0 auto;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
}

.user-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
```

### 状態管理（Pinia）
```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  getters: {
    username: (state) => state.user?.name || 'Guest',
    isAdmin: (state) => state.user?.role === 'admin'
  },
  
  actions: {
    async login(credentials) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })
        
        if (response.ok) {
          this.user = await response.json()
          this.isAuthenticated = true
          return true
        }
        return false
      } catch (error) {
        console.error('ログインエラー:', error)
        return false
      }
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})

// 使用例
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const handleLogin = async () => {
  const success = await userStore.login({
    email: 'user@example.com',
    password: 'password'
  })
  
  if (success) {
    router.push('/dashboard')
  }
}
</script>
```

## デバッグとトラブルシューティング

### Vue Devtools
```javascript
// コンポーネントからデータを確認
console.log(this.$data) // Options API
console.log({ ...reactive_data }) // Composition API

// イベントをキャッチ
<button @click="e => console.log(e)">クリック</button>
```

### エラーハンドリング
```javascript
// グローバルエラーハンドラー
const app = createApp(App)
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err)
  console.log('Component:', instance)
  console.log('Info:', info)
}

// コンポーネント内エラーハンドリング
export default {
  errorCaptured(err, instance, info) {
    console.error('Error captured:', err)
    return false // エラー伝播を止める
  }
}
```

### パフォーマンス最適化
```javascript
// 遅延ローディング
const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'))

// v-memo（Vue 3.2+）
<template>
  <div v-memo="[valueA, valueB]">
    <!-- 高コストな計算 -->
  </div>
</template>

// KeepAlive
<template>
  <keep-alive>
    <component :is="currentComponent" />
  </keep-alive>
</template>
```

## 必須のVSCode拡張機能

1. **Vetur**または**Volar** - Vue.jsサポート
2. **ESLint** - コード品質チェック
3. **Prettier** - コードフォーマッタ
4. **Vue 3 Snippets** - Vue.jsスニペット
5. **Path Intellisense** - パス補完
6. **Auto Close Tag** - タグ自動閉じ
7. **Auto Rename Tag** - タグ自動リネーム
8. **Live Server** - ローカルサーバー

## 設定例

### VSCode settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "files.associations": {
    "*.vue": "vue"
  },
  "emmet.includeLanguages": {
    "vue": "html"
  }
}
```

### package.json スクリプト
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext vue,js,jsx,cjs,mjs --fix --ignore-path .gitignore",
    "format": "prettier . --write"
  }
}
```

## クイックリファレンス

### Vue3 Reactivity API
```javascript
import { ref, reactive, computed, watch } from 'vue'

// ref - 単一値のリアクティブ化
const count = ref(0)
count.value++ // .valueでアクセス

// reactive - オブジェクトのリアクティブ化
const state = reactive({
  name: '田中',
  age: 30
})
state.age++ // 直接アクセス

// computed - 算出プロパティ
const doubled = computed(() => count.value * 2)

// watch - 変更監視
watch(count, (newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`)
})

// watchEffect - 自動的に依存関係を追跡
watchEffect(() => {
  console.log(count.value)
})
```

### JavaScript便利な機能
```javascript
// オプショナルチェイニング
const name = user?.profile?.name

// Nullish合体演算子
const port = process.env.PORT ?? 3000

// テンプレートリテラル
const message = `Hello ${name}!`

// 分割代入（デフォルト値付き）
const { name = 'Guest', age = 0 } = user

// 動的import
const module = await import('./module.js')

// Promise.all（並列処理）
const [users, posts] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
])
```
