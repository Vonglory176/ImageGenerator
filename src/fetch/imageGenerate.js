export async function imageGenerate(apiKey, dataInput) {
    // console.log(dataInput.models)
    const options = {
        method: "POST",
        headers: {
            "apikey": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": dataInput.prompt + (dataInput.negativePrompt? ` ### ${dataInput.negativePrompt}`:""),
            "params": {
            "seed": dataInput.seed,
            "height": parseInt(dataInput.height),
            "width": parseInt(dataInput.width),
            "seed_variation": 1000,
            "post_processing": [],
            "karras": dataInput.karras,
            "tiling": dataInput.tiling,
            "hires_fix": dataInput.hiResFix,
            "clip_skip": parseInt(dataInput.clipSkip),
            "sampler_name": "k_euler", // k_heun
            "steps": parseInt(dataInput.steps),
            "n": 1
            },
            "nsfw": dataInput.nsfw,
            "censor_nsfw": !dataInput.nsfw,
            "trusted_workers": dataInput.trustedWorkers,
            "slow_workers": true,
            "worker_blacklist": false,
            "models": [
                dataInput.model //Only one for now
            ],
            "r2": true,
            "shared": false,
        })
    }
    try {
        const response = await fetch(`https://aihorde.net/api/v2/generate/async`, options)
        let data = await response.json()
        // console.log(data)

        return data
    }
    catch(error) {
      console.log(error)
      return error
    }

    {let test = {
        "prompt": dataInput.prompt + (dataInput.negativePrompt? ` ### ${dataInput.negativePrompt}`:""),
        "params": {
          "seed": dataInput.seed,
          "height": dataInput.height,
          "width": dataInput.width,
          "seed_variation": 1000,
          "post_processing": [],
          "karras": dataInput.karras,
          "tiling": dataInput.tiling,
          "hires_fix": dataInput.hiResFix,
          "clip_skip": dataInput.clipSkip,
          "sampler_name": "k_euler",
          //"facefixer_strength": 0.75,
        //   "loras": [
        //     {
        //       "name": "GlowingRunesAIV6",
        //       "model": 1,
        //       "clip": 1,
        //       "inject_trigger": "string"
        //     }
        //   ],
          "steps": dataInput.steps,
          "n": 1
        },
        "nsfw": dataInput.nsfw,
        "censor_nsfw": false,
        "trusted_workers": dataInput.trustedWorkers,
        "slow_workers": true,
        // "workers": [
        //   "string"
        // ],
        "worker_blacklist": false,
        "models": [
          "string"
        ],
        // "source_image": "string",
        // "source_processing": "img2img",
        // "source_mask": "string",
        "r2": true,
        "shared": false,
        // "replacement_filter": true,
        // "dry_run": false
      }
    }
}