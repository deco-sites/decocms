import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "../sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";
export default defineApp(async (_req, ctx) => {
    const revision = await Context.active().release?.revision();
    return (<>
      {/* Include default fonts and css vars */}
      <Theme colorScheme="any"/>

      {/* Include Icons and manifest */}
      <Head>
        {/* Material Design Icons - Filled Version */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,1,0"
        />
        {/* JetBrains Mono (and Geologica) for code/command styling */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin"/>

        {/* Typekit Font */}
        <link rel="stylesheet" href="https://use.typekit.net/msc6uga.css"/>

        {/* Tailwind v3 CSS file */}
        <link href={asset(`/styles.css?revision=${revision}`)} rel="stylesheet"/>

        {/* Global selection colors */}
        <style>{`
          ::selection { background-color: #F1FE9F; color: #8CAA25; }
          ::-moz-selection { background-color: #F1FE9F; color: #8CAA25; }
        `}</style>

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")}/>
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />
    </>);
});

