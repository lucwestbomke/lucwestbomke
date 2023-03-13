<template>
  <main id="LegalPage">
    <h1>Impressum</h1>
    <h2>Angaben gemäß § 5 TMG</h2>
    <p>
      Luc Westbomke <br />
      Westwall 5a <br />
      59581 Warstein <br />
    </p>
    <h2>Kontakt</h2>
    <p>
      <!-- Telefon: [Telefonnummer der verantwortlichen Stelle] <br /> -->
      E-Mail: lucwestbomke@gmail.com
    </p>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
#LegalPage {
  * {
    margin-bottom: 30px;
  }
  h1 {
    margin: 50px 0px 100px;
    text-align: center;
    // word-break: break-all;
  }
  h2 {
    font-size: 22px;
    line-height: 30px;
  }
  h3 {
    font-size: 38px;
  }
  h4 {
    font-size: 38px;
  }
  p {
    line-height: 30px;
  }
  ul {
    list-style-type: circle;
    margin-left: 30px;
    li {
      list-style-type: circle;
    }
  }
}
</style>
