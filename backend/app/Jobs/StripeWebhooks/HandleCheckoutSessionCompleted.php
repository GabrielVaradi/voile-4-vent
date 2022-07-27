<?php

namespace App\Jobs\StripeWebhooks;

use App\Models\Skill;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Spatie\WebhookClient\Models\WebhookCall;

class HandleCheckoutSessionCompleted implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /** @var WebhookCall */
    public $webhookCall;

    public function __construct(WebhookCall $webhookCall)
    {
        $this->webhookCall = $webhookCall;
    }

    public function handle()
    {
        $data = $this->webhookCall->payload['data']['object']['metadata'];
        $skill = new Skill();
        $skill->name_en = $data['email'];
        $skill->name_fr = 'STRIPE FR';
        $skill->save();
    }
}
